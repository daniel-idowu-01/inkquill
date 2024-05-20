import axios from "axios";
import { store } from "@/store";
import { useState } from "react";

const summarizeApi = () => {
  const { data } = store();
  const [summarizedText, setSummarizedText] = useState("");
  const apiData = {
    text: data,
  };

  const summarizeText = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    // Make the POST request
    axios
      .post("http://localhost:8000/api", JSON.stringify(apiData), { headers })
      .then((response) => {
        // Handle the response
        setSummarizedText(response.data.summarize.summary);
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making POST request:", error);
      });
  };
  return { summarizeText, summarizedText, setSummarizedText };
};

export default summarizeApi;
