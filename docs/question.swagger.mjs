/**
 * @swagger
 * tags:
 *   - name: Questions
 *     description: Question management
 *   - name: Answers
 *     description: Answer management
 *   - name: Votes
 *     description: Voting system
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of questions
 */

/**
 * @swagger
 * /questions/search:
 *   get:
 *     summary: Search questions by title or category
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by title keyword
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Questions found
 *       400:
 *         description: Invalid search parameters
 *       404:
 *         description: No questions found
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     summary: Get a single question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Question found
 *       404:
 *         description: Question not found
 *
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question updated
 *       404:
 *         description: Question not found
 *
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Question deleted
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /questions/{questionId}/vote:
 *   post:
 *     summary: Vote on a question
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: questionId
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
 *         description: Question not found
 */

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   post:
 *     summary: Add an answer to a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Answer created
 *       404:
 *         description: Question not found
 *
 *   get:
 *     summary: Get all answers for a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: List of answers
 *       404:
 *         description: Question not found
 *
 *   delete:
 *     summary: Delete all answers for a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Answers deleted
 *       404:
 *         description: Question or answers not found
 */
