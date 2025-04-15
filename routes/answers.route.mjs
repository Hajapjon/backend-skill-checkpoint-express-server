import { Router } from "express";
import connectionPool from "../utils/db.mjs";
export const answersRouter = Router();

answersRouter.post("/:answerId/vote", async (req, res) => {

  const answerId = req.params.answerId;
  const { vote } = req.body;

  if (![1, -1].includes(vote)) {
    return res.status(400).json({ message: "Invalid vote value." });
  }

  try {
    const check = await connectionPool.query(
      `SELECT id FROM answers WHERE id = $1`,
      [answerId]
    );

    if (check.rowCount === 0) {
      return res.status(404).json({ message: "Answer not found." });
    }

    await connectionPool.query(
      `INSERT INTO answer_votes (answer_id, vote) VALUES ($1, $2)`,
      [answerId, vote]
    );

    return res.status(200).json({
      message: "Vote on the answer has been recorded successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to vote answer." });
  }
});
