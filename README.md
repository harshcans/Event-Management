# Event Management System API

A REST API for managing society events using **Node.js, Express.js, MongoDB, and Mongoose**.

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman

## Features

* Create, read, update and delete events
* Search and filter events
* Pagination and sorting
* Input validation
* Duplicate event checking
* Event status management
* Consistent error handling

## Project Structure

```text
event-management-api/
├── server.js
├── db.js
├── Event.js
├── eventRoutes.js
├── eventController.js
├── errorHandler.js
├── .env
└── README.md
```

## Installation

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/event_management
```

Run the server:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api/events
```

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| POST   | `/`      | Create event    |
| GET    | `/`      | Get all events  |
| GET    | `/:id`   | Get event by ID |
| PUT    | `/:id`   | Update event    |
| DELETE | `/:id`   | Delete event    |

### Query Examples

```text
/events?search=hackathon
/events?venue=auditorium
/events?status=upcoming
/events?page=1&limit=10
/events?sort=startDate&order=asc
```

## Event Fields

```text
name
description
startDate
endDate
venue
capacity
status
```

Supported status:

```text
upcoming
ongoing
completed
cancelled
```

## Business Rules

* Event cannot start in the past.
* Capacity must be greater than 0.
* End date must be after start date.
* Duplicate events are not allowed.
* Completed events cannot be updated or deleted.

## Status Codes

* `200` – Success
* `201` – Created
* `400` – Bad Request
* `404` – Not Found
* `409` – Conflict
* `500` – Server Error
