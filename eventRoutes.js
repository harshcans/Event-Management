const express = require("express");

const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
} = require("./eventController");

const router = express.Router();

router.post("/", createEvent);

router.get("/", getEvents);

router.get("/:id", getEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;