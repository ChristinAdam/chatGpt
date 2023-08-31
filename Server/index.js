const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());
// ... (your imports and setup)

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.API_KEY_OPENAI;
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt,
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("API Response:", response.data);

    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error(
      "Error communicating with the OpenAI API:",
      error.response.data
    );
    res.status(500).send("Error communicating with the OpenAI API.");
  }
});

// ... (your server setup and listen)
const port = 5001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
