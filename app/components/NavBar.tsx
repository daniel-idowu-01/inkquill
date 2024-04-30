import React from "react";
import Link from "next/link";
import Button from "../ui/Button";
import Hamburger from "../ui/icons/Hamburger";

const NavBar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/",
    },
    {
      title: "Features",
      link: "/",
    },
    {
      title: "FAQs",
      link: "/",
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <p className="text-white md:text-black text-2xl md:text-4xl tracking-wide">
        Ink
        <span className="txt-white md:text-azure-blue font-semibold">
          Quill
        </span>
      </p>

      <article className="hidden md:flex items-center justify-between md:w-1/2 lg:w-1/4">
        {links.map((link) => (
          <Link className="hover:underline" href={link.link}>
            {link.title}
          </Link>
        ))}
      </article>

      <Hamburger />
      <div className="hidden md:block">
        <Button label="Contact Us" />
      </div>
    </div>
  );
};

export default NavBar;
