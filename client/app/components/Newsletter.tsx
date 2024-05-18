import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Button from "../ui/Button";

const Newsletter = () => {
  return (
    <div className="p-10 lg:p-20">
      <section className="text-center w-[90%] lg:w-[60%] mx-auto">
        <p className="text-black text-2xl md:text-4xl tracking-wide mb-1">
          Join Our{" "}
          <span className="text-azure-blue font-semibold">Community</span>
        </p>
        <p className="opacity-70">Subscribe To Our Newsletter</p>
      </section>

      <section className="flex gap-10 py-10">
        <article className="hidden lg:flex justify-center w-1/2">
          <Image
            className="rounded-md w-full"
            src="/images/newsletter.jpg"
            alt=""
            width={500}
            height={500}
          />
        </article>

        <article className="flex items-center w-full lg:w-1/2 bg-azure-blue p-5 md:p-10 rounded-md">
          <aside className="m-auto flex flex-col gap-5 w-full md:w-[80%]">
            <Input
              className=" placeholder:text-lg"
              type="text"
              placeholder="Name"
            />
            <Input
              className=" placeholder:text-lg"
              type="email"
              placeholder="Email"
            />
            <div>
              <Button whiteBg={true} label="Submit" />
            </div>
          </aside>
        </article>
      </section>
    </div>
  );
};

export default Newsletter;
