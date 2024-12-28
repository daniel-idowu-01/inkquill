"use client";
import React from "react";
import Link from "next/link";
import { NavBar } from "@/app/components";
import { useClientStore } from "@/store";
import AnimatedText from "../components/AnimatedText/AnimatedText";
import ParaphraseApi from "./ParaphraseApi";
import Speaker from "@/app/ui/icons/Speaker";
import { speak } from "@/app/utils/TextToSpeech";

const Paraphraser = () => {
  const { data, setData } = useClientStore();
  const {
    paraphraseText,
    setParaphrasedText,
    paraphrasedText,
    paraphraseLoading,
  } = ParaphraseApi();

  // function to handle paraphrasing
  const handleParaphrase = () => {
    paraphraseText();

    setParaphrasedText("");
  };

  return (
    <main>
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
      {paraphrasedText && (
        <div className="w-[90%] flex justify-end pb-5">
          <span
            onClick={() => speak(paraphrasedText)}
            className="bg-azure-blue rounded-full p-2 hover:cursor-pointer"
          >
            <Speaker />
          </span>
        </div>
      )}

      <section className="flex flex-col md:flex-row justify-center h-80 gap-10">
        <textarea
          onChange={(e) => setData(e.target.value)}
          name="paste-text"
          id="paste-text"
          cols={30}
          rows={10}
          placeholder="Paste text"
          defaultValue=""
          className="mx-auto md:mx-0 border-2 border-azure-blue border-dashed w-[90%] md:w-[40%] focus:outline-azure-blue p-2 rounded-md"
        ></textarea>

        <article className="overflow-y-scroll mx-auto md:mx-0 bg-azure-blue text-cotton-white w-[90%] md:w-[40%] h-96 md:h-full rounded-md p-2">
          {paraphrasedText ? (
            <AnimatedText text={paraphrasedText} delay={100} />
          ) : (
            "Paraphrased text"
          )}
        </article>
      </section>

      <section className="flex justify-center my-5">
        <button
          onClick={handleParaphrase}
          disabled={paraphraseLoading}
          className={`${
            paraphraseLoading && "opacity-50"
          } bg-cotton-white md:bg-azure-blue text-azure-blue md:text-cotton-white hover:text-cotton-white md:hover:text-azure-blue px-6 py-3 rounded-md border border-azure-blue hover:bg-azure-blue md:hover:bg-transparent transition-all font-[550] mx-auto`}
        >
          {paraphraseLoading ? "Paraphrasing..." : "Paraphrase"}
        </button>
      </section>
    </main>
  );
};

export default Paraphraser;
