"use client";
import React from "react";
import Link from "next/link";
import { NavBar } from "@/app/components";
import Button from "@/app/ui/Button";
import { useClientStore  } from "@/store";
import summarizeApi from "@/app/utils/summarizeApi";

const PasteText = () => {
  const { data, setData } = useClientStore ();
  const { summarizeText, summarizedText, summarizeLoading } = summarizeApi();

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
      <section className="flex flex-col md:flex-row justify-center h-80 gap-10">
        <textarea
          onChange={(e) => setData(e.target.value)}
          name="paste-text"
          id="paste-text"
          cols={30}
          rows={10}
          placeholder="Paste text"
          defaultValue={data}
          className="mx-auto md:mx-0 border-2 border-azure-blue border-dashed w-[90%] md:w-[40%] focus:outline-azure-blue p-2 rounded-md"
        ></textarea>

        <article className="mx-auto md:mx-0 bg-azure-blue text-cotton-white w-[90%] md:w-[40%] h-96 md:h-full rounded-md p-2">
          {summarizedText ? summarizedText : "Summarized text"}
        </article>
      </section>

      <section className="flex justify-center my-5">
        <button
          onClick={summarizeText}
          disabled={summarizeLoading}
          className={`${
            summarizeLoading && "opacity-50"
          } bg-cotton-white md:bg-azure-blue text-azure-blue md:text-cotton-white hover:text-cotton-white md:hover:text-azure-blue px-6 py-3 rounded-md border border-azure-blue hover:bg-azure-blue md:hover:bg-transparent transition-all font-[550] mx-auto`}
        >
          {summarizeLoading ? "Summarizing..." : "Summarize"}
        </button>
      </section>
    </main>
  );
};

export default PasteText;