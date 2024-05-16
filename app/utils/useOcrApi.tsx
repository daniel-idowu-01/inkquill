import { store } from "@/store";
import { useState } from "react";

const useOcrApi = () => {
  const apiKey = process.env.OCR_API_KEY ?? "helloworld";
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData } = store();

  // set loading state
  if (isLoading) {
    console.log("fetching...");
  }

  // form info
  const myHeaders = new Headers();
  /* myHeaders.append("apikey", apiKey); */

  const formdata = new FormData();
  formdata.append("apikey", apiKey);
  formdata.append("language", "eng");
  formdata.append("isOverlayRequired", "false");
  formdata.append("url", fileUrl);
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
        const parsedData = JSON.parse(result);
        setData(parsedData.ParsedResults[0].ParsedText);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  console.log(data)
  return { getText, setFileUrl, fileUrl };
};

export default useOcrApi;
