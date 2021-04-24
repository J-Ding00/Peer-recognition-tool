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
 *              properties:
 *                message:
 *                  type: string
 *     responses:
 *       '201':
 *         description: Returns the updated recognition including comments
 */
router.post('/:recogId', async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "You are not logged in" });
    return
  }

  const recog = await Recognition.findOne({ _id: req.params.recogId });

  if (!recog) {
    res.status(404).send(`No comment with ID ${recog}`);
    return;
  }

  if (!('message' in req.body)) {
    res.status(422).send('Use format {"message": "comment text"}');
    return;
  }

  // TODO: Proper validation would probably be a good idea
  await recog.comments.push({
    message: req.body.message,
    giverName: `${req.user.firstName} ${req.user.lastName}`,
    creationDate: new Date(),
    employeeId: req.user.employeeId,
    likes: []
  });

  await recog.save();
  res.status(201).send(recog);
});

module.exports = router;
