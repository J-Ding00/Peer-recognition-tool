const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

// Handle GET request for notification
router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You are not logged in' })
        return
    }

    // res.status(200).json([
    //     {
    //         message: 'Test Notification 0',
    //         arrivalTime: Date.now(),
    //         recognitionID: 0
    //     },
    //     {
    //         message: 'Test Notification 1',
    //         arrivalTime: Date.parse('04 Dec 1995 00:12:00 GMT'),
    //         recognitionID: 1
    //     },
    // ])

    res.status(200).json(
        {
            notifications: [
                {
                    message: "Test notification message 0",
                    arrivalTime: new Date(),
                    recognitionID: 0
                },
                {
                    message: "Test notification message 1",
                    arrivalTime: new Date("2021-01-01T00:00:00"),
                    recognitionID: 1
                }
            ]
        }
    );

    // FIXME: Replace above placeholder data with production data below (works)
    // res.status(200).send(req.user.activeNotifications);
})

router.delete('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }

    // FIXME: Uncomment these lines when line 38 is addressed
    // req.user.notifications = [];
    // await req.user.save();

    res.status(204);
})

module.exports = router;
