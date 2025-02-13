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

    axios
      .post(
        process.env.NODE_ENV == "production"
          ? process.env.PARAPHRASE_API || ""
          : "http://localhost:5000/api/user/paraphrase",
        JSON.stringify(apiData),
        { headers }
      )
      .then((response) => {
        let paragraphs = response.data.generate;
        setParaphrasedText(paragraphs);
        setParaphraseLoading(false);
      })
      .catch((error) => {
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
