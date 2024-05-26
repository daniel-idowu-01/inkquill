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

app.get("/api/paraphrase", (req, res) => {
  (async () => {
    try {
      const generate = await cohere.generate({
        prompt: 'Paraphrase this text: "Lexeme categories refer to the different types of words in a language based on their grammatical function and meaning. Some common lexeme categories include nouns, verbs, adjectives, adverbs, pronouns, prepositions, conjunctions, and interjections. Each category serves a specific purpose in constructing sentences and conveying meaning."',
      });
    
      console.log(generate);
      /* res.json({ summarize });
      res.end(); */
    } catch (error) {
      console.log(error);
    }
  })();
});


// at the end of the file
app.listen(8000, () => {
  console.log("Port is listening...");
});
