import axios from "axios";
import { useClientStore } from "@/store";
import { useState } from "react";

const ParaphraseApi = () => {
  const { data } = useClientStore();
  const [paraphraseLoading, setParaphraseLoading] = useState(false);
  const [paraphrasedText, setParaphrasedText] = useState("");
  const apiData = {
    text: data,
  };

  const paraphraseText = () => {
    setParaphraseLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };

    // Make the POST request
    axios
      .post(
        process.env.PARAPHRASE_API || "",
        JSON.stringify(apiData),
        { headers }
      )
      .then((response) => {
        // Handle the response
        setParaphrasedText(response.data.generate.generations[0].text);
        setParaphraseLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making POST request:", error);
        setParaphraseLoading(false);
      });
  };
  return {
    paraphraseText,
    paraphrasedText,
    setParaphrasedText,
    paraphraseLoading,
  };
};

export default ParaphraseApi;
