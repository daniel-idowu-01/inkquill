import React from "react";
import Link from "next/link";
import { NavBar } from "../components";
import { Input } from "@/components/ui/input";

const Summarizer = () => {
  return (
    <main>
      <section className="p-7 md:px-10 lg:px-14 bg-azure-blue md:bg-cotton-white">
        <NavBar />
      </section>
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
          <Input id="picture" type="file" className="w-1/2 lg:w-1/4 mx-auto" />
          <p className="text-center">or</p>
          <div className="flex justify-center">
            <Link
              href=""
              className="border border-azure-blue text-azure-blue px-4 py-3 rounded-md"
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
