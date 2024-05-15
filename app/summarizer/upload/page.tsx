"use client";
import axios from "axios";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import Link from "next/link";
import Button from "@/app/ui/Button";
import { NavBar } from "@/app/components";
import { Input } from "@/components/ui/input";
import useOcrApi from "@/app/utils/useOcrApi";

const Upload = () => {
  const preset_key = "yykpflgd";
  const cloud_name = "ds8bolg2f";
  const { setFile, setFileUrl, getText } = useOcrApi();

  // update upload file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]; // Null check
    const formdata = new FormData();
    formdata.append("file", uploadedFile)
    formdata.append("upload_preset", preset_key);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formdata)
      .then((res) => setFileUrl(res.data.secure_url))
      .catch((err) => console.log(err));
    /* if (uploadedFile) {
      setFile(uploadedFile);
      setFileUrl(URL.createObjectURL(uploadedFile)); // Create blob URL
    } */
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
      <section className="mx-auto bg-cotton-white w-[90%] md:w-[70%] h-96 pt-10">
        <article className="w-1/2 lg:w-1/4 mx-auto flex flex-col justify-center gap-10 h-full">
          <Input
            type="file"
            onChange={handleFileChange}
            className=" border-azure-blue text-azure-blue"
          />
          <div onClick={getText} className="mx-auto">
            <Button whiteBg={false} label="Upload Image" />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Upload;
