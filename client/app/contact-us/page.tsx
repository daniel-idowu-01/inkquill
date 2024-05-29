import React from "react";
import Image from "next/image";
import { NavBar } from "../components";
import { Input } from "@/components/ui/input";
import Button from "../ui/Button";

const ContactUs = () => {
  return (
    <div>
      <section className="p-7 md:px-10 lg:px-14 bg-azure-blue md:bg-cotton-white">
        <NavBar />
      </section>

      <section className="p-10 lg:p-20 text-center w-[90%] lg:w-[60%] mx-auto">
        <p className="text-black text-2xl md:text-4xl tracking-wide mb-1">
          Contact <span className="text-azure-blue font-semibold">Us</span>
        </p>
        <p className="opacity-70">Let us know what you think of our services</p>
      </section>

      <section className="flex gap-10 px-10">
        <article className="hidden lg:flex justify-center w-1/2">
          <Image
            className="rounded-md"
            src="/images/contact.svg"
            alt=""
            width={500}
            height={500}
          />
        </article>

        <article className="flex items-center w-full lg:w-1/2 bg-azure-blue p-5 md:p-10 rounded-md">
          <form
            method="POST"
            className="m-auto flex flex-col gap-5 w-full"
            action="https://formsubmit.co/05c1cab5b2be38d30577d50fae9840e3"
          >
            <Input
              required
              className="placeholder:text-lg placeholder:opacity-80"
              type="text"
              name="name"
              placeholder="Name"
            />
            <Input
              required
              className="placeholder:text-lg placeholder:opacity-80"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input type="hidden" name="_captcha" value="false"></input>
            <textarea
              required
              cols={30}
              rows={10}
              name="message"
              className="p-2 px-3 rounded-md placeholder:text-xl"
              placeholder="Message..."
            ></textarea>

            <button
              type="submit"
              className={`bg-cotton-white  text-azure-blue px-6 py-3 rounded-md transition-all font-[550]`}
            >
              Submit
            </button>
          </form>
        </article>
      </section>
    </div>
  );
};

export default ContactUs;
