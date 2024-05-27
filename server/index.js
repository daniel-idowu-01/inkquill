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

app.post("/api/summarize", (req, res) => {
  (async () => {
    try {
      const summarize = await cohere.summarize({
        text: req.body.text,
      });
      res.json({ summarize });
      res.end();
    } catch (error) {
      res.json({ error });
    }
  })();
});

app.post("/api/paraphrase", (req, res) => {
  (async () => {
    try {
      const generate = await cohere.generate({
        prompt: `Paraphrase this text: ${req.body.text}`,
      });
      res.json({ generate });
      res.end();
    } catch (error) {
      console.log(error);
    }
  })();
});

// at the end of the file
app.listen(8000, () => {
  console.log("Port is listening...");
});
