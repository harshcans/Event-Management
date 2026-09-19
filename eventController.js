const Event = require("./Event");

async function createEvent(req, res, next) {
  try {
    const { name, description, startDate, endDate, venue, capacity } = req.body;

    if (!name || !startDate || !endDate || !venue || capacity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, startDate, endDate, venue and capacity are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    if (start <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Event cannot start in the past",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    if (Number(capacity) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Capacity must be greater than 0",
      });
    }

    const duplicateEvent = await Event.findOne({
      name: name.trim(),
      startDate: start,
      venue: venue.trim(),
    });

    if (duplicateEvent) {
      return res.status(409).json({
        success: false,
        message: "A similar event already exists",
      });
    }

    const event = await Event.create({
      name: name.trim(),
      description: description || "",
      startDate: start,
      endDate: end,
      venue: venue.trim(),
      capacity: Number(capacity),
      status: "upcoming",
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

async function getEvents(req, res, next) {
  try {
    let {
      search,
      venue,
      status,
      page = 1,
      limit = 10,
      sort = "startDate",
      order = "asc",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: "Page must be at least 1 and limit must be between 1 and 100",
      });
    }

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (venue) {
      filter.venue = {
        $regex: venue,
        $options: "i",
      };
    }

    if (status) {
      const allowedStatuses = ["upcoming", "ongoing", "completed", "cancelled"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      filter.status = status;
    }

    const sortOrder = order === "desc" ? -1 : 1;

    const sortObject = {};
    sortObject[sort] = sortOrder;

    const totalEvents = await Event.countDocuments(filter);

    const events = await Event.find(filter)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: events,
      pagination: {
        page: page,
        limit: limit,
        totalEvents: totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

async function updateEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    updateEventStatus(event);

    if (event.status === "completed") {
      return res.status(409).json({
        success: false,
        message: "Completed events cannot be updated",
      });
    }

    if (event.status === "ongoing" && req.body.status !== "cancelled") {
      return res.status(409).json({
        success: false,
        message: "Ongoing events can only be cancelled",
      });
    }

    if (req.body.name !== undefined) {
      if (!req.body.name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Event name cannot be empty",
        });
      }

      event.name = req.body.name.trim();
    }

    if (req.body.description !== undefined) {
      event.description = req.body.description;
    }

    if (req.body.venue !== undefined) {
      if (!req.body.venue.trim()) {
        return res.status(400).json({
          success: false,
          message: "Venue cannot be empty",
        });
      }

      event.venue = req.body.venue.trim();
    }

    if (req.body.capacity !== undefined) {
      if (Number(req.body.capacity) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Capacity must be greater than 0",
        });
      }

      event.capacity = Number(req.body.capacity);
    }

    if (req.body.startDate !== undefined) {
      const newStartDate = new Date(req.body.startDate);

      if (isNaN(newStartDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid start date",
        });
      }

      if (newStartDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Start date must be in the future",
        });
      }

      event.startDate = newStartDate;
    }

    if (req.body.endDate !== undefined) {
      const newEndDate = new Date(req.body.endDate);

      if (isNaN(newEndDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid end date",
        });
      }

      event.endDate = newEndDate;
    }


    if (event.endDate <= event.startDate) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    if (req.body.status !== undefined) {
      const allowedStatuses = ["upcoming", "ongoing", "completed", "cancelled"];

      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      event.status = req.body.status;
    }

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    updateEventStatus(event);

    if (event.status === "completed") {
      return res.status(409).json({
        success: false,
        message: "Completed events cannot be deleted",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

function updateEventStatus(event) {
  if (event.status === "cancelled") {
    return;
  }

  const now = new Date();

  if (now < event.startDate) {
    event.status = "upcoming";
  } else if (now >= event.startDate && now <= event.endDate) {
    event.status = "ongoing";
  } else {
    event.status = "completed";
  }
}

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
