"use client";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import CustomUpload from "./CustomUpload";

const Upload = () => {
  const {
    responseMessage,
    selectedFile,
    setSelectedFile,
    handleUpload,
    isLoading,
  } = CustomUpload();
  
  const FILE_ICON =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAPtY9GS4QgwAjRUSvLaa6TP4fSlQkVDqEg&s";

  // upload file function
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (!uploadedFile) return;
    setSelectedFile(uploadedFile);

    // Check if uploadedFile is defined
    // if (uploadedFile) {
    //   setFileLoading(true);
    //   const formdata = new FormData();
    //   formdata.append("file", uploadedFile);
    //   formdata.append("upload_preset", preset_key);
    //   axios
    //     .post(
    //       `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    //       formdata
    //     )
    //     .then((res) => {
    //       setFileUrl(res.data.secure_url);
    //       setFileLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setFileLoading(false);
    //     });
    // }
  };

  return (
    <main>
      <section className="flex items-center justify-center gap-5 py-10">
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
      <section className="mx-auto bg-cotton-white w-[90%] md:w-[70%] h-96 pt-10">
        <article className="w-1/2 lg:w-1/4 mx-auto flex flex-col justify-center gap-10 h-full">
          {selectedFile && (
            <Image
              src={FILE_ICON}
              alt=""
              width={50}
              height={50}
              className="mx-auto"
            />
          )}
          <Input
            type="file"
            onChange={handleFileChange}
            //accept=".pdf"
            className=" border-azure-blue text-azure-blue"
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className={`${
              !selectedFile || (isLoading && "opacity-50")
            } bg-cotton-white md:bg-azure-blue text-azure-blue md:text-cotton-white hover:text-cotton-white md:hover:text-azure-blue px-6 py-3 rounded-md border border-azure-blue hover:bg-azure-blue md:hover:bg-transparent transition-all font-[550] mx-auto`}
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </button>

          {responseMessage && <p>{responseMessage}</p>}
        </article>
      </section>
    </main>
  );
};

export default Upload;
