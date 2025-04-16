/**
 * @swagger
 * /answers/{answerId}/vote:
 *   post:
 *     summary: Vote on an answer
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: answerId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vote
 *             properties:
 *               vote:
 *                 type: integer
 *                 enum: [1, -1]
 *     responses:
 *       200:
 *         description: Vote recorded
 *       400:
 *         description: Invalid vote value
 *       404:
 *         description: Answer not found
 */

// 👇 เพิ่มบรรทัดนี้
export const __swagger_answer_dummy = true;
