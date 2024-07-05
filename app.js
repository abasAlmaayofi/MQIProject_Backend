const { sendEmail } = require("./sendEmail.js");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL, //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/sendEmail", async (req, res) => {
  const results = req.body;
  sendEmail(results).catch(console.error);
  res.send("good");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
