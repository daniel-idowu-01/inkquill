"use client";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenWithExpiration } from "../utils/token";

interface User {
  userId: string;
  token: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formInput, setFormInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const notifyCatchError = (error: String) => toast.warn(error);
  const notifySuccess = () => toast.success("User data updated!");
  const { data, error, loading, refetch } = useFetch(
    "api/user",
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    },
    false
  );

  // Function to handle form input change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  // Fetch user data on mount
  useEffect(() => {
    const storedUser = getTokenWithExpiration();
    setUser(storedUser);

    refetch();
  }, []);

  // Refetch data when user changes
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  // Function to handle user update
  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formInput),
      });
      setIsLoading(false);

      if (!response.ok) {
        notifyCatchError(response.statusText);
      }
      notifySuccess();
      console.log("Response:", response);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating user:", error);
    }
  };

  return (
    <section className="flex justify-center p-5 sm:p-10 text-2xl">
      <ToastContainer className='text-base' />
      <form onSubmit={handleUserUpdate}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-azure-blue">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                      inkquill.vercel.app/
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      onChange={(e) => handleFormChange(e)}
                      defaultValue={data?.message?.username}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    onChange={(e) => handleFormChange(e)}
                    defaultValue={data?.message?.firstName}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-azure-blue sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="lastName"
                    onChange={(e) => handleFormChange(e)}
                    defaultValue={data?.message?.lastName}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-azure-blue sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={data?.message?.email}
                    readOnly
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-azure-blue sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-azure-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-blue"
          >
            {isLoading ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
