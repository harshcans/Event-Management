# Event Management System API

A REST API for managing society events using **Node.js, Express.js, MongoDB, and Mongoose**.

## Features

* Create an event
* Get all events
* Get a single event by ID
* Update an event
* Delete an event
* Search events by name
* Filter events by venue and status
* Pagination
* Sorting
* Input validation
* Duplicate event checking
* Consistent error handling
* Event status management

## Technologies Used

* **Node.js** – JavaScript runtime
* **Express.js** – Web framework for creating the REST API
* **MongoDB** – Database
* **Mongoose** – ODM for MongoDB
* **Postman** – API testing

## Project Structure

```text
event-management-api/
│
├── server.js
├── db.js
├── Event.js
├── eventRoutes.js
├── eventController.js
├── errorHandler.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

### File Description

| File                 | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| `server.js`          | Starts the server and configures Express                |
| `db.js`              | Connects the application to MongoDB                     |
| `Event.js`           | Defines the Event schema and Mongoose model             |
| `eventRoutes.js`     | Defines API routes                                      |
| `eventController.js` | Contains CRUD operations, validation and business logic |
| `errorHandler.js`    | Handles errors consistently                             |
| `.env`               | Stores environment variables                            |
| `README.md`          | Project documentation                                   |

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd event-management-api
```

### 3. Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/event_management
```

Make sure `.env` is added to `.gitignore` so the database connection details are not uploaded to GitHub.

## Running the Project

### Start normally

```bash
npm start
```

### Start in development mode

```bash
npm run dev
```

The server will run at:

```text
http://localhost:5000
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api/events
```

### 1. Create Event

**POST**

```text
/api/events
```

Example request:

```json
{
    "name": "Society Hackathon",
    "description": "A coding event for society members",
    "startDate": "2026-10-10T10:00:00",
    "endDate": "2026-10-10T16:00:00",
    "venue": "Community Hall",
    "capacity": 50
}
```

Response status:

```text
201 Created
```

## 2. Get All Events

**GET**

```text
/api/events
```

Example:

```text
GET http://localhost:5000/api/events
```

Response status:

```text
200 OK
```

## 3. Get Event by ID

**GET**

```text
/api/events/:id
```

Example:

```text
GET http://localhost:5000/api/events/68c123456789abcdef123456
```

Response status:

```text
200 OK
```

If the event does not exist:

```text
404 Not Found
```

## 4. Update Event

**PUT**

```text
/api/events/:id
```

Example:

```text
PUT http://localhost:5000/api/events/68c123456789abcdef123456
```

Request body:

```json
{
    "venue": "Main Auditorium",
    "capacity": 80
}
```

Response status:

```text
200 OK
```

## 5. Delete Event

**DELETE**

```text
/api/events/:id
```

Example:

```text
DELETE http://localhost:5000/api/events/68c123456789abcdef123456
```

Response status:

```text
200 OK
```

## Search and Filtering

### Search by event name

```text
GET /api/events?search=hackathon
```

### Filter by venue

```text
GET /api/events?venue=auditorium
```

### Filter by status

```text
GET /api/events?status=upcoming
```

Supported statuses:

```text
upcoming
ongoing
completed
cancelled
```

## Pagination

Pagination allows the API to return a limited number of events instead of returning all events at once.

Example:

```text
GET /api/events?page=1&limit=10
```

Where:

* `page` = page number
* `limit` = number of events per page

Example:

```text
GET /api/events?page=2&limit=5
```

This returns the second page containing up to 5 events.

## Sorting

Events can be sorted using the `sort` and `order` query parameters.

Example:

```text
GET /api/events?sort=startDate&order=asc
```

Descending order:

```text
GET /api/events?sort=startDate&order=desc
```

Example sorting fields:

```text
startDate
endDate
name
capacity
createdAt
```

## Combined Query

Search, filtering, pagination and sorting can be used together.

Example:

```text
GET /api/events?search=hackathon&venue=hall&page=1&limit=5&sort=startDate&order=asc
```

## Validation and Business Rules

The API follows these rules:

1. Event name is required.
2. Venue is required.
3. Start date is required.
4. End date is required.
5. Capacity is required.
6. Capacity must be greater than 0.
7. Event cannot start in the past.
8. End date must be after start date.
9. Duplicate events are rejected.
10. Completed events cannot be updated.
11. Completed events cannot be deleted.
12. Event status can be:

* `upcoming`
* `ongoing`
* `completed`
* `cancelled`

## HTTP Status Codes

| Status Code | Meaning                             |
| ----------- | ----------------------------------- |
| `200`       | Request successful                  |
| `201`       | Event successfully created          |
| `400`       | Invalid request or validation error |
| `404`       | Event not found                     |
| `409`       | Conflict with a business rule       |
| `500`       | Unexpected server error             |

## Example Error Response

```json
{
    "success": false,
    "message": "Event not found"
}
```

## How the API Works

The basic request flow is:

```text
Postman / Client
       ↓
   Express Server
       ↓
     Routes
       ↓
   Controller
       ↓
Mongoose Model
       ↓
    MongoDB
       ↓
   Response
```

For example, when creating an event:

```text
POST /api/events
       ↓
eventRoutes.js
       ↓
createEvent()
       ↓
Validation
       ↓
Event.create()
       ↓
MongoDB
       ↓
201 Created
```

## Testing

The API can be tested using **Postman**.

Test the following operations:

```text
POST    /api/events
GET     /api/events
GET     /api/events/:id
PUT     /api/events/:id
DELETE  /api/events/:id
```

Also test:

```text
Search
Filtering
Pagination
Sorting
Invalid data
Invalid ID
Non-existing event
Duplicate event
Business-rule conflicts
```

## Author

**Harsh Singh**

Event Management System REST API
