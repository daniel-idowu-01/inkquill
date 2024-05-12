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
    formdata.append("url", "http://dl.a9t9.com/ocrbenchmark/eng.png");
  } else {
    console.error("File is null. Cannot append null value to FormData.");
  }
  formdata.append("filetype", "pdf");
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
  return { getText, setFile };
};

export default useOcrApi;
