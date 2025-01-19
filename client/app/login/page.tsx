"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/store";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

interface JwtPayload {
  id: string;
}

const Login = () => {
  let userId = null;
  const router = useRouter();
  const [formInput, setFormInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useClientStore();
  const buttonStyle =
    "border bg-button p-3 rounded-md hover:bg-opacity-80 transition-all";
  const notifyCatchError = (error: String) => toast.warn(error);
  const notifySuccess = () => toast.success("You are logged in!");

  // Function to handle form input change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    fetch(`http://localhost:8000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) {
          notifyCatchError(body.message);
        }
        setIsLoading(false);
        return body;
      })
      .then((data) => {
        if (data.success) {
          setIsAuthenticated(true);
          const decoded = jwtDecode<JwtPayload>(data.message);
          console.log("decoded", decoded);
          userId = decoded?.id;
          localStorage.setItem("user", JSON.stringify({ userId, token: data.message }));
          notifySuccess();
          router.push("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        notifyCatchError(`${err}`);
        console.error("Errrrrrrrrrr", err);
      });
  };

  return (
    <section>
      <ToastContainer />
      <article className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center z-50">
          <h2 className="text-2xl/9 tracking-tight">Login to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-50">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => handleFormChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-azure-blue hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => handleFormChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className={`${
                  isLoading
                    ? "bg-[#e6e6e6]"
                    : "text-azure-blue hover:bg-opacity-85 bg-azure-blue"
                } flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm`}
                style={{ height: "40px" }}
              >
                {isLoading ? "Logging in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold text-azure-blue hover:text-azure-blue hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
};

export default Login;
