// imports at the top of the file
const { CohereClient } = require("cohere-ai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const apiKey = process.env.COHERE_API_KEY;
const cohere = new CohereClient({
  token: apiKey,
});

app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res, next) => {
  try {
    const summarize = await cohere.summarize({
      text: req.body.text,
    });
    console.log("summarize", summarize)
    return res.status(200).json({ success: true, summarize });
  } catch (error) {
    next(error);
  }
});

app.post("/api/paraphrase", async (req, res, next) => {
  try {
    const generate = await cohere.generate({
      prompt: `Paraphrase this text: ${req.body.text}`,
    });
    console.log("generate", generate)
    return res.status(200).json({ success: true, generate });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

// at the end of the file
app.listen(8000, () => {
  console.log("Port is listening on port 8000...");
});
