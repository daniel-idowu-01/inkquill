import axios from "axios";
import { useClientStore } from "@/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CustomUpload = () => {
  const router = useRouter();
  const { setData } = useClientStore();
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      setResponseMessage("Please add a file!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        process.env.NODE_ENV == "production"
          ? process.env.PREDICT_API || ""
          : "http://127.0.0.1:5000/api/user/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const result = await response.data;
      setData(result.message.text);
      setIsLoading(false);
      router.push("/summarizer/paste-text");
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading file:", error);
      setResponseMessage("Error processing the file.");
    }
  };

  return {
    isLoading,
    handleUpload,
    responseMessage,
    selectedFile,
    setSelectedFile,
  };
};

export default CustomUpload;
