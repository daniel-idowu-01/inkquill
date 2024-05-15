import { useState } from "react";

const useOcrApi = () => {
  const apiKey = process.env.API_KEY ?? "helloworld";
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // set loading state
  if (isLoading) {
    console.log("fetching...");
  }

  // form info
  const myHeaders = new Headers();
  myHeaders.append("apikey", apiKey);

  const formdata = new FormData();
  formdata.append("language", "eng");
  formdata.append("isOverlayRequired", "false");
  if (fileUrl !== null) {
    formdata.append("url", fileUrl);
    /* "https://imgs.search.brave.com/jL9Wn0n4qvKp6DdN3Z8gjm7SJ7op4NDzZY0DsDEsN-E/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUxLzQz/LzM3LzUxNDMzN2Ux/ZWI0ZGU4ZTU1MmRk/MGNjYWVhODM3Zjhj/LmpwZw" */
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
  return { getText, setFile, setFileUrl };
};

export default useOcrApi;
