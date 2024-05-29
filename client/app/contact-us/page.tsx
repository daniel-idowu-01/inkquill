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
            src="/images/newsletter.jpg"
            alt=""
            width={500}
            height={500}
          />
        </article>

        <article className="flex items-center w-full lg:w-1/2 bg-azure-blue p-5 md:p-10 rounded-md">
          <aside className="m-auto flex flex-col gap-5 w-full md:w-[80%]">
            <Input
              className="placeholder:text-lg placeholder:opacity-80"
              type="text"
              placeholder="Name"
            />
            <Input
              className="placeholder:text-lg placeholder:opacity-80"
              type="email"
              placeholder="Email"
            />
            <textarea
              cols={30}
              rows={10}
              className="p-2 px-3 rounded-md placeholder:text-xl"
              placeholder="Message..."
            ></textarea>
            <div>
              <Button whiteBg={true} label="Submit" />
            </div>
          </aside>
        </article>
      </section>
    </div>
  );
};

export default ContactUs;
