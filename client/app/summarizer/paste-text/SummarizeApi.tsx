import axios from "axios";
import { useClientStore } from "@/store";
import { useState } from "react";

const SummarizeApi = () => {
  const { data } = useClientStore();
  const [errorLength, setErrorLength] = useState(false);
  const [summarizeLoading, setSummarizeLoading] = useState(false);
  const [summarizedText, setSummarizedText] = useState("");
  const apiData = {
    text: data,
  };

  const summarizeText = () => {
    setSummarizeLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };

    if (apiData.text.length < 250) {
      setErrorLength(true);
      setSummarizeLoading(false);
    } else {
      setErrorLength(false);
      
      axios
        .post(
          process.env.NODE_ENV == "production"
            ? process.env.SUMMARIZE_API || ""
            : "http://localhost:5000/api/user/summarize",
          JSON.stringify(apiData),
          {
            headers,
          }
        )
        .then((response) => {
          setSummarizedText(response.data.summarize);
          setSummarizeLoading(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
          setSummarizeLoading(false);
        });
    }
  };
  return {
    summarizeText,
    summarizedText,
    setSummarizedText,
    summarizeLoading,
    errorLength,
  };
};

export default SummarizeApi;
