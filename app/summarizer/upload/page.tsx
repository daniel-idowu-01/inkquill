"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import Button from "@/app/ui/Button";
import { NavBar } from "@/app/components";
import { Input } from "@/components/ui/input";
import useOcrApi from "@/app/utils/useOcrApi";

const Upload = () => {
  const preset_key = "yykpflgd";
  const cloud_name = "ds8bolg2f";
  const file_icon =
    "https://imgs.search.brave.com/PkNC4u9TBqgKPrkKztC8BMORU8gNafaa0E1jKCgBEYw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzg4/Ni9QTkcvNTEyL2Zp/bGVfSW1hZ2VfZG93/bmxvYWRfaWNvbi1p/Y29ucy5jb21fNjg5/NDIucG5n";
  const { fileUrl, setFileUrl, getText } = useOcrApi();

  // upload file function
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]; // Null check
    // Check if uploadedFile is defined
    if (uploadedFile) {
      const formdata = new FormData();
      formdata.append("file", uploadedFile);
      formdata.append("upload_preset", preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formdata
        )
        .then((res) => setFileUrl(res.data.secure_url))
        .catch((err) => console.log(err));
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
          <div onClick={getText} className="mx-auto">
            <Button whiteBg={false} label="Upload Image" />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Upload;
