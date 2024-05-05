"use client";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import Link from "next/link";
import { NavBar } from "../components";
import { Input } from "@/components/ui/input";

const Summarizer = () => {
  const apiKey = process.env.API_KEY ?? "helloworld";
  const [file, setFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // update upload file
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;

    if (files !== null && files.length > 0) {
      // Assuming you want to store only the first selected file
      const file = files[0];
      setFile(file.name);
    } else {
      setFile(""); // Reset the selectedFile state if no file is selected
    }
  };

  console.log(file)

  // form info
  const myHeaders = new Headers();
  myHeaders.append("apikey", apiKey);

  const formdata = new FormData();
  formdata.append("language", "eng");
  formdata.append("isOverlayRequired", "false");
  if (file !== null) {
    formdata.append("url", file);
  } else {
    console.error("File is null. Cannot append null value to FormData.");
  }
  formdata.append("filetype", "png");
  formdata.append("iscreatesearchablepdf", "false");
  formdata.append("issearchablepdfhidetextlayer", "false");

  // form further info
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  // using the api
  useEffect(() => {
    setIsLoading(true);
    const getText = async () => {
      await fetch("https://api.ocr.space/parse/image", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };

    getText();
  }, []);

  // set loading state
  if (isLoading) {
    console.log("fetching...");
  }

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
