// This file contains functions and endpoints for working with awards.

const express = require('express')

// Routers are used to split endpoints across multiple files.
const router = express.Router()

// PLACEHOLDER_EMPLOYEE is used here temporarily to create placeholder awards.
// When this file is connected to the database, make sure to remove this object.
// When implementing award queries, replace "PLACEHOLDER_EMPLOYEE" with the
// Employee object returned by Mongoose. It should work without any changes.
const PLACEHOLDER_EMPLOYEE = {
  firstName: 'Lorem',
  lastName: 'Ipsum',
  companyId: 0,
  positionTitle: 'Placeholder',
  companyName: 'COMPSCI 320',
  isManager: true,
  employeeId: 0,
  managerId: null,
  email: '???@umass.edu',
  startDate: '???',
}

// makeAward returns an object representing an award using the given recipient
// (employee), name, and description (both strings).
function makeAward(recipient, name, desc) {
  return {
    awardName: name,
    awardDesc: desc,
    recipient: recipient
  }
}

// getAwards returns all of the issued awards in the given year and month
async function getAwards(year, month) {
  let awards = []

  awards.push(makeAward(
    PLACEHOLDER_EMPLOYEE,
    'Placeholder Award',
    'Placeholder award from API, created at ' + Date.now(),
  ))

  // Award pseudocode. Simple awards can be added something like this:
  //
  // let recipient = query employees based on award criteria;
  // awards.push(makeAward(
  //   recipient,
  //   'Name of the award',
  //   'Details about the award',
  // ));

  return awards
}

/**
 * @openapi
 * /awards/{year}/{month}:
 *   get:
 *     description: Get awards for a given year and month
 *     responses:
 *       '200':
 *         description: A list of awards given in the month and year. Recipient is an employee object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   awardName:
 *                     type: string
 *                   awardDesc:
 *                     type: string
 *                   recipient:
 *                     type: object
 */
router.get('/:year/:month', async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' })
    return
  }

  const month = parseInt(req.params.month)
  const year = parseInt(req.params.year)

  if (isNaN(month) || isNaN(year)) {
    res.status(404).send({ message: 'Month and year must be integers' })
    return
  }

  if (month < 1 || month > 12) {
    res.status(404).send({ message: 'Month must be in range [1, 12]' })
    return
  }

  res.status(200).send(await getAwards(year, month))
})

module.exports = router;
