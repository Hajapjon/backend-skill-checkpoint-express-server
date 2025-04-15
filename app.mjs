import express from "express";
import { questionRouter } from "./routes/question.route.mjs";
import { answersRouter } from "./routes/answers.route.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions",questionRouter)
app.use("/answers", answersRouter)

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
