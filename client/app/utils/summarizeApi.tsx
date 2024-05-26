import axios from "axios";
import { useClientStore  } from "@/store";
import { useState } from "react";

const summarizeApi = () => {
  const { data } = useClientStore ();
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

    // Make the POST request
    axios
      .post("http://localhost:8000/api/summarize", JSON.stringify(apiData), { headers })
      .then((response) => {
        // Handle the response
        setSummarizedText(response.data.summarize.summary);
        setSummarizeLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making POST request:", error);
        setSummarizeLoading(false);
      });
  };
  return { summarizeText, summarizedText, setSummarizedText, summarizeLoading };
};

export default summarizeApi;
