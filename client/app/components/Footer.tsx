import React from "react";
import Link from "next/link";
import { links } from "../data/data";
import Button from "../ui/Button";

const Footer = () => {
  return (
    <div className="text-cotton-white bg-azure-blue flex flex-col md:flex-row justify-between gap-14 md:gap-0 p-10 lg:p-20 rounded-t-3xl">
      <section>
        <p className="text-white text-2xl md:text-4xl tracking-wide">
          Ink
          <span className="font-semibold">Quill</span>
        </p>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-3">Company</h2>
        <article className="flex flex-col gap-3 text-xl">
          {links.map((link, index) => (
            <Link key={index} className="hover:underline" href={link.link}>
              {link.title}
            </Link>
          ))}
        </article>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-3">Terms & Policies</h2>
        <article className="text-xl flex flex-col gap-3">
          <p>Terms</p>
          <p>Policies</p>
        </article>
      </section>

      <section>
        <Button whiteBg={true} label="Contact Us" />
      </section>
    </div>
  );
};

export default Footer;
