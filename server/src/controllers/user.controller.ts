import { CohereClient } from "cohere-ai";
import { Request, Response, NextFunction } from "express";

const apiKey = process.env.COHERE_API_KEY;
if (!apiKey) {
  throw new Error("COHERE_API_KEY is required");
}

const cohere = new CohereClient({
  token: apiKey,
});

// Define an interface for request body
interface TextRequestBody {
  text: string;
}

const handleSummarize = async (
  req: Request<{}, {}, TextRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const summarize = await cohere.summarize({
      text: req.body.text,
    });
    console.log("Summarize result:", summarize);
    res.status(200).json({ success: true, summarize });
  } catch (error) {
    console.error("Error in handleSummarize:", error);
    next(error);
  }
};

const handleParaphrase = async (
  req: Request<{}, {}, TextRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const generate = await cohere.generate({
      prompt: `Paraphrase this text: ${req.body.text}`,
    });
    console.log("Generate result:", generate);
    res.status(200).json({ success: true, generate });
  } catch (error) {
    console.error("Error in handleParaphrase:", error);
    next(error);
  }
};

export { handleSummarize, handleParaphrase };
