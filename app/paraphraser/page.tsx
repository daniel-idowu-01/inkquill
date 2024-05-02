import React from "react";
import Link from "next/link";
import { NavBar } from "../components";

const Paraphraser = () => {
  return (
    <main>
      <section className="p-7 md:px-10 lg:px-14 bg-azure-blue md:bg-cotton-white">
        <NavBar />
      </section>
      <section className="flex items-center justify-center gap-5 py-10">
        <Link href="/summarizer">Summarize</Link>
        <Link
          href="/paraphraser"
          className="bg-azure-blue text-cotton-white px-4 py-3 rounded-md"
        >
          Paraphrase
        </Link>
      </section>

      {/* main content of the page */}
      <section></section>
    </main>
  );
};

export default Paraphraser;
