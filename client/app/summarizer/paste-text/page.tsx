"use client";
import axios from "axios";
import React, {useState} from "react";
import Link from "next/link";
import { NavBar } from "@/app/components";
import Button from "@/app/ui/Button";
import { store } from "@/store";

const PasteText = () => {
  const { data } = store();
  const apiData = {
    text: data
  }

  const summarizeText = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    // Make the POST request
    axios
      .post("http://localhost:8000/api", JSON.stringify(apiData), { headers })
      .then((response) => {
        // Handle the response
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making POST request:", error);
      });
  };

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
          name="paste-text"
          id="paste-text"
          cols={30}
          rows={10}
          placeholder="Paste text"
          defaultValue={data}
          className="mx-auto md:mx-0 border-2 border-azure-blue border-dashed w-[90%] md:w-[40%] focus:outline-azure-blue p-2 rounded-md"
        ></textarea>

        <article className="mx-auto md:mx-0 bg-azure-blue text-cotton-white w-[90%] md:w-[40%] h-96 md:h-full rounded-md p-2">
          Summarized text
        </article>
      </section>

      <div
        onClick={summarizeText}
        className="flex justify-center mt-10 bg-azure-blue md:bg-transparent p-3 md:p-0 rounded-tr-3xl rounded-bl-3xl"
      >
        <Button whiteBg={false} label="Summarize" />
      </div>
    </main>
  );
};

export default PasteText;
