const router = require('express').Router()
const Recognition = require('../models/recognition.model');

/**
 * @openapi
 * /postComment/{id}:
 *   post:
 *     description: Add a comment to the recognition with the given ID
 *     parameters:
 *       -
 *          name: value
 *          in: body
 *          description: Comment to add
 *          required: true
 *          schema:
 *              type: object
 *     responses:
 *       '201':
 *         description: Returns the updated recognition including comments
 */
router.post('/:id', async (req, res) => {
  const recog = await Recognition.findOne({ id: req.params.id });

  // TODO: Use real comment schema
  // await recog.comments.push(req.body);
  // await recog.save();

  res.status(201).send(recog);
});

module.exports = router;
