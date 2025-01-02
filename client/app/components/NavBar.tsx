"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { links } from "../data/data";
import Hamburger from "../ui/icons/Hamburger";
import Cancel from "../ui/icons/Cancel";
import User from "../ui/icons/User";
import Dropdown from "./Dropdown";

const NavBar = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [sideBar, setSideBar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // make it a global state

  // to hide sidebar when clicking outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // function to toggle sidebar
  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div className="flex items-center justify-between">
      <Link
        href="/"
        className="text-white md:text-black text-2xl md:text-4xl tracking-wide"
      >
        Ink
        <span className="txt-white md:text-azure-blue font-semibold">
          Quill
        </span>
      </Link>

      <article className="hidden md:flex items-center justify-between md:w-1/2 lg:w-1/4">
        {links.map((link, index) => (
          <Link key={index} className="hover:underline" href={link.link}>
            {link.title}
          </Link>
        ))}
      </article>

      {isAuthenticated ? (
        <Dropdown />
      ) : (
        <div className="hidden md:block">
          <Link href="/login">
            <Button whiteBg={false} label="Login" />
          </Link>
        </div>
      )}

      <div className="md:hidden" onClick={handleSideBar}>
        <Hamburger />
      </div>

      {/* mobile sidebar */}
      <article
        ref={sidebarRef}
        className={`fixed top-0 ${
          sideBar ? "left-0" : "-left-full"
        } h-screen bg-cotton-white w-[80%] transition-all md:hidden z-50`}
      >
        <span
          onClick={() => setSideBar(false)}
          className="absolute right-5 top-5"
        >
          <Cancel />
        </span>

        <div className="relative top-32 flex flex-col gap-14 text-center text-2xl">
          {links.map((link, index) => (
            <Link
              onClick={() => setSideBar(false)}
              key={index}
              className="text-azure-blue hover:underline"
              href={link.link}
            >
              {link.title}
            </Link>
          ))}

          <Link onClick={() => setSideBar(false)} href="/contact-us">
            <button
              className={`bg-azure-blue text-cotton-white hover:text-cotton-white px-6 py-3 rounded-md hover:bg-opacity-80 transition-all font-[550] mx-auto`}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default NavBar;
