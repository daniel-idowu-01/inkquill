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

app.get("/api", (req, res) => {
  (async () => {
    try {
      const summarize = await cohere.summarize({
        text: "The relationship between humans and dogs dates back thousands of years, with evidence suggesting that the domestication of dogs began as early as 15,000 years ago. Early humans likely formed a symbiotic relationship with wild wolves, where mutual benefits such as hunting assistance and protection led to a gradual process of domestication. Over generations, these wolves evolved into the diverse breeds of domestic dogs we see today. Archaeological findings indicate that ancient civilizations revered dogs, often depicting them in art and burying them alongside humans. In ancient Egypt, dogs were considered sacred and often mummified, while in ancient Greece and Rome, they were celebrated for their loyalty and bravery. This historical bond underscores the deep-seated connection humans have shared with dogs, one that has been built on mutual trust and companionship.",
      });
      console.log(summarize);
    } catch (error) {
      console.log(error);
    }
  })();
});

// at the end of the file
app.listen(8000, () => {
  console.log("Port is listening...");
});
