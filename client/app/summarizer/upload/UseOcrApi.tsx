import { useClientStore } from "@/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UseOcrApi = () => {
  const { setData } = useClientStore();
  const router = useRouter();
  const apiKey = process.env.OCR_API_KEY || "";
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    await fetch(process.env.OCR_API || "", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedData = JSON.parse(result);
        setData(parsedData.ParsedResults[0].ParsedText);
        setIsLoading(false);
        router.push("/summarizer/paste-text");
      })
      .catch((error) => {
        console.error("Error: ", error);
        setIsLoading(false);
      });
  };

  return { getText, setFileUrl, fileUrl, isLoading };
};

export default UseOcrApi;
