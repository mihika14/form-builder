const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()

app.use(express.json());
const cors = require("cors");
app.use(cors());

const { MONGODB_URI } = process.env;
mongoose
  .connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.error(e));

require("./models/Questions");
const Questions = mongoose.model("questions");

app.get("/questions", async (req, res) => {
  try {
    const questions = await Questions.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

app.post("/createquestion", async (req, res) => {
  try {
    const { question, solution } = req.body; 
    await Questions.create({ question, solution }); 
    res.status(200).json({ status: "ok", message: "Question and solution added" });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Bad request" });
  }
});

require("./models/Responses");
const Responses = mongoose.model("responses");

app.post("/response", async (req, res) => {
  try {
    const { questionId, response } = req.body; 
    const userResponse = new Responses({
      questionId,
      response,
    });
    
    const savedResponse = await userResponse.save();

    res.status(200).json({ status: "ok", message: "User response added", response: savedResponse });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Bad request" });
  }
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
