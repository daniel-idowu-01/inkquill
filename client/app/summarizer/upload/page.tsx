"use client";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { NavBar } from "@/app/components";
import { Input } from "@/components/ui/input";
import useOcrApi from "@/app/utils/useOcrApi";

const Upload = () => {
  const { fileUrl, setFileUrl, getText } = useOcrApi();
  const [fileLoading, setFileLoading] = useState(false);
  const preset_key = process.env.CLOUDINARY_PRESET_KEY ?? "";
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const file_icon =
    "https://imgs.search.brave.com/PkNC4u9TBqgKPrkKztC8BMORU8gNafaa0E1jKCgBEYw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzg4/Ni9QTkcvNTEyL2Zp/bGVfSW1hZ2VfZG93/bmxvYWRfaWNvbi1p/Y29ucy5jb21fNjg5/NDIucG5n";

  // upload file function
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]; // Null check
    // Check if uploadedFile is defined
    if (uploadedFile) {
      setFileLoading(true);
      const formdata = new FormData();
      formdata.append("file", uploadedFile);
      formdata.append("upload_preset", preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formdata
        )
        .then((res) => {
          setFileUrl(res.data.secure_url);
          setFileLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setFileLoading(false);
        });
    }
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
          {fileUrl && (
            <img src={file_icon} alt="" className="w-20 h-20 mx-auto" />
          )}
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className=" border-azure-blue text-azure-blue"
          />

          <button
            onClick={getText}
            disabled={fileLoading}
            className={`${
              fileLoading && "opacity-50"
            } bg-cotton-white md:bg-azure-blue text-azure-blue md:text-cotton-white hover:text-cotton-white md:hover:text-azure-blue px-6 py-3 rounded-md border border-azure-blue hover:bg-azure-blue md:hover:bg-transparent transition-all font-[550] mx-auto`}
          >
            {fileLoading ? "Uploading..." : "Upload File"}
          </button>
        </article>
      </section>
    </main>
  );
};

export default Upload;
