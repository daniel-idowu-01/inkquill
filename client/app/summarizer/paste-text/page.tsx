"use client";
import React from "react";
import Link from "next/link";
import { NavBar } from "@/app/components";
import { useClientStore } from "@/store";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";
import SummarizeApi from "@/app/summarizer/paste-text/SummarizeApi";
import Speaker from "@/app/ui/icons/Speaker";
import { speak } from "@/app/utils/TextToSpeech";

const PasteText = () => {
  const { data, setData } = useClientStore();
  const {
    summarizeText,
    setSummarizedText,
    summarizedText,
    summarizeLoading,
    errorLength,
  } = SummarizeApi();

  // function to summarize text
  const handleSummarize = () => {
    summarizeText();

    setSummarizedText("");
  };
  return (
    <main>
      <section className="flex items-center justify-center gap-5 pt-10 pb-5">
        <Link
          href="/summarizer"
          className="bg-azure-blue text-cotton-white px-4 py-3 rounded-md"
        >
          Summarize
        </Link>
        <Link
          href="/paraphraser"
          className="border border-azure-blue text-azure-blue hover:bg-azure-blue hover:text-cotton-white px-4 py-3 rounded-md transition-colors"
        >
          Paraphrase
        </Link>
      </section>

      {/* main content of the page */}
      {summarizedText && (
        <div className="w-[90%] flex justify-end pb-5">
          <span
            onClick={() => speak(summarizedText)}
            className="bg-azure-blue rounded-full p-2 hover:cursor-pointer"
          >
            <Speaker />
          </span>
        </div>
      )}

      <section className="flex flex-col md:flex-row justify-center h-[26rem] gap-10">
        <textarea
          onChange={(e) => setData(e.target.value)}
          name="paste-text"
          id="paste-text"
          cols={30}
          rows={10}
          placeholder="Paste text"
          defaultValue={data}
          className="hide-scrollbar mx-auto md:mx-0 border-2 border-azure-blue border-dashed w-[90%] md:w-[40%] focus:outline-azure-blue p-2 rounded-md"
        ></textarea>

        <article className="hide-scrollbar overflow-y-scroll mx-auto md:mx-0 bg-azure-blue text-cotton-white w-[90%] md:w-[40%] h-96 md:h-full rounded-md p-2">
          {summarizedText ? (
            <AnimatedText text={summarizedText} delay={100} />
          ) : (
            "Summarized text"
          )}
        </article>
      </section>

      {errorLength && (
        <p className="text-red-500 text-sm text-center my-2">
          Text must be more than 250 words!
        </p>
      )}

      <section className="flex justify-center my-5">
        <button
          onClick={handleSummarize}
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
