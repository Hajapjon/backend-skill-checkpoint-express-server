import express from "express";
import { questionRouter } from "./routes/question.route.mjs";
import { answerRouter } from "./routes/answer.route.mjs";
import { setupSwagger } from "./swagger.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions",questionRouter)
app.use("/answers", answerRouter)

setupSwagger(app);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
