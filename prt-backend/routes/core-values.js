const router = require("express").Router();
const Company = require("../models/company.model.js");

/**
 * @openapi
 * /values:
 *   get:
 *     description: Get all core values for user's company
 *     responses:
 *       '200':
 *         description: A list of core values as strings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "You are not logged in" });
        return
    }

    const companyID = req.user.companyId;
    const company = await Company.findOne({ companyId: companyID });
    //Watch out for the differences in capitalization of companyID between server and database
    res.status(200).json(
        company.values
    );
});

/**
 * @openapi
 * /values:
 *   post:
 *     description: Add a new core value to the user's company. Requires admin.
 *     parameters:
 *       -
 *          name: value
 *          in: body
 *          description: New core value to add
 *          required: true
 *          schema:
 *              type: object
 *              required:
 *                - value
 *              properties:
 *                value:
 *                  type: string
 *     responses:
 *       '201':
 *         description: Returns all core values for the company including the created one
 */
router.post('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }
    
    const isAdmin = true; // Replace with actual check
    if (!isAdmin) {
        res.status(403).send({ message: 'Only admins can edit core values' })
        return
    }
    
    // Expected format:
    // { "value": "Text" }
    
    if (!('value' in req.body)) {
        res.status(422).send({ message: 'Use format {"value": "Value text"}' })
        return
    }
    
    const companyID = req.user.companyId;
    const company = await Company.findOne({ companyId: companyID });

    // TODO: Add newValue to "values" field of current employee (req.user)'s
    // company
    const newValue = req.body.value;
    await company.values.push(newValue);
    await company.save();
    
    res.status(201).send({ values: company.values })
})

module.exports = router;
