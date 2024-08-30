// Предполагается, что этот код находится в файле, где вы настраиваете ваше Express-приложение
import express from "express";
import dotenv from "dotenv";
import openAIRequest from "./utils/openaiRequest.js"; // Обратите внимание на .js в концеopenaiRequest"; // Убедитесь, что путь к файлу верный

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/user/:username", (req, res) => {
  let data = {
    username: req.params.username,
    hobbies: [
      "Хотите такой сайт?",
      "Регистрируйтесь у нас",
      "и генерируйте",
      "свои сайты!!!",
    ],
  };
  res.render("user", data);
});

app.post("/api/message", express.json(), async (req, res) => {
  const { success, data, error } = await openAIRequest(req.body.content);
  if (success) {
    res.json(data);
  } else {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 3150;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
