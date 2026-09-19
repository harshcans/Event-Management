const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        venue: {
            type: String,
            required: true,
            trim: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming"
        }
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;