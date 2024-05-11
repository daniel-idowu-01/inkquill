"use client";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import Link from "next/link";
import { NavBar } from "../components";
import { Input } from "@/components/ui/input";
import useOcrApi from "../utils/useOcrApi";

const Summarizer = () => {
  const { getText } = useOcrApi();
  const [file, setFile] = useState<File | null>(null);

  // update upload file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]; // Null check
    if (uploadedFile) {
      setFile(uploadedFile);
      /* setFileUrl(URL.createObjectURL(uploadedFile)); */ // Create blob URL
    }
  };

  useEffect(() => {
    getText();
  }, []);
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
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-1/2 lg:w-1/4 mx-auto"
          />
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
