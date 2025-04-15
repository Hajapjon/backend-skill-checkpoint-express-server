import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateQuestion } from "../middlewares/question.validation.mjs";
import { validateCreateAnswer } from "../middlewares/answer.validation.mjs";
export const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  try {
    const result = await connectionPool.query(`select * from questions`);
    return res.status(200).json({
      data: result.rows,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to fetch questions.",
    });
  }
});

questionRouter.get("/search", async (req, res) => {
  try {
    const { title, category } = req.query;

    if (!title && !category) {
      return res.status(400).json({
        message: "Invalid search parameters.",
      });
    }

    let query = "SELECT * FROM questions WHERE";
    const conditions = [];
    const values = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    if (category) {
      values.push(`%${category}%`);
      conditions.push(`COALESCE(category, '') ILIKE $${values.length}`);
    }

    query += " " + conditions.join(" AND ");

    const result = await connectionPool.query(query, values);

    if (result.rowCount > 0) {
      return res.status(200).json({ data: result.rows });
    } else {
      return res.status(404).json({ message: "Question not found." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch questions.",
    });
  }
});

questionRouter.post("/:questionId/answers", validateCreateAnswer, async (req, res) => {
  try {
    const { content } = req.body;
    const questionId = req.params.questionId;
    const questionCheck = await connectionPool.query(
      `SELECT id FROM questions WHERE id = $1`,
      [questionId]
    );

    if (questionCheck.rowCount === 0) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    const result = await connectionPool.query(
      `INSERT INTO answers (question_id, content)
       VALUES ($1, $2)`,
      [questionId, content]
    );

    return res.status(201).json({
      message: "Answer created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create answer.",
    });
  }
});

questionRouter.post("/:questionId/vote", async (req, res) => {
  const questionId = req.params.questionId;
  const { vote } = req.body;

  if (![1, -1].includes(vote)) {
    return res.status(400).json({ message: "Invalid vote value." });
  }

  try {
    const check = await connectionPool.query(
      `SELECT id FROM questions WHERE id = $1`,
      [questionId]
    );

    if (check.rowCount === 0) {
      return res.status(404).json({ message: "Question not found." });
    }

    await connectionPool.query(
      `INSERT INTO question_votes (question_id, vote) VALUES ($1, $2)`,
      [questionId, vote]
    );

    return res.status(200).json({
      message: "Vote on the question has been recorded successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to vote question." });
  }
});

questionRouter.get("/:questionId/answers", async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const result = await connectionPool.query(
      `select * from answers where question_id = $1`,
      [questionId]
    );

    if (result.rowCount > 0) {
      return res.status(200).json({
        data: result.rows,
      });
    } else {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
  } catch {
    return res.status(500).json({
      message: "Unable to fetch answers.",
    });
  }
});

questionRouter.delete("/:questionId/answers", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const checkQuestion = await connectionPool.query(
      `SELECT id FROM questions WHERE id = $1`,
      [questionId]
    );

    if (checkQuestion.rowCount === 0) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
    const result = await connectionPool.query(
      `DELETE FROM answers WHERE question_id = $1`,
      [questionId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "No answers found for this question.",
      });
    }

    return res.status(200).json({
      message: "All answers for the question have been deleted successfully.",
    });
  } catch {
    return res.status(500).json({
      message: "Unable to delete answers.",
    });
  }
});

questionRouter.get("/:questionId", async (req, res) => {
  try {
    const result = await connectionPool.query(
      `select * from questions where id = $1`,
      [req.params.questionId]
    );
    if (result.rowCount > 0) {
      return res.status(200).json({
        data: result.rows[0],
      });
    } else {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
  } catch {
    return res.status(500).json({
      message: "Unable to fetch questions.",
    });
  }
});

questionRouter.delete("/:questionId", async (req, res) => {
  try {
    const result = await connectionPool.query(
      `delete from questions where id = $1`,
      [req.params.questionId]
    );
    if (result.rowCount > 0) {
      return res.status(200).json({
        message: "Question post has been deleted successfully.",
      });
    } else {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
  } catch {
    return res.status(500).json({
      message: "Unable to delete questions.",
    });
  }
});

questionRouter.put("/:questionId", validateCreateQuestion, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const result = await connectionPool.query(
      `update questions set title = $2, description = $3, category = $4
      where id =$1`,
      [req.params.questionId, title, description, category]
    );
    if (result.rowCount > 0) {
      return res.status(200).json({
        message: "Question updated successfully.",
      });
    } else {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
  } catch {
    return res.status(500).json({
      message: "Unable to update questions.",
    });
  }
});

questionRouter.post("/", validateCreateQuestion, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const result = await connectionPool.query(
      `insert into questions (title, description, category)
        values($1, $2, $3)`,
      [title, description, category]
    );
    if (result.rowCount > 0) {
      return res.status(201).json({
        message: "Question created successfully.",
      });
    }
  } catch {
    return res.status(500).json({
      message: "Unable to create question.",
    });
  }
});
