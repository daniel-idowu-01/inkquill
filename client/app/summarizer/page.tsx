"use client";
import React from "react";
import Link from "next/link";
import { NavBar } from "../components";

const Summarizer = () => {
  return (
    <main>
      <section className="flex items-center justify-center gap-5 py-10">
        <Link
          href="/summarizer"
          className="bg-azure-blue text-cotton-white px-4 py-3 rounded-md"
        >
          Summarize
        </Link>
        <Link href="/paraphraser">Paraphrase</Link>
      </section>

      {/* main content of the page */}
      <section className="mx-auto bg-cotton-white w-[90%] md:w-[70%] h-96 pt-10">
        <article className="flex flex-col justify-center gap-5 h-full">
          <Link
            href="/summarizer/upload"
            className="w-fit mx-auto border border-azure-blue hover:text-azure-blue bg-azure-blue hover:bg-transparent text-cotton-white px-4 py-3 rounded-md transition-all"
          >
            Upload File
          </Link>
          <p className="text-center">or</p>
          <div className="flex justify-center">
            <Link
              href="/summarizer/paste-text"
              className="border border-azure-blue text-azure-blue hover:bg-azure-blue hover:text-cotton-white px-4 py-3 rounded-md transition-all"
            >
              Paste Text
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Summarizer;
