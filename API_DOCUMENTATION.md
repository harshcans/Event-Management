# API Documentation

## Base URL

`https://event-management-xxmk.onrender.com`

## Event Object

```json
{
  "name": "Society Hackathon",
  "description": "A coding event for society members",
  "startDate": "2026-10-10T10:00:00",
  "endDate": "2026-10-10T16:00:00",
  "venue": "Community Hall",
  "capacity": 50,
  "status": "upcoming"
}
```

## Endpoints

### 1. Create Event

**POST** `/`

Request body:

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

Success: `201 Created`

### 2. Get All Events

**GET** `/`

Returns all events.

Success: `200 OK`

### 3. Get Event by ID

**GET** `/:id`

Example:

`GET /68c123456789abcdef123456`

Success: `200 OK`

If the event does not exist: `404 Not Found`

### 4. Update Event

**PUT** `/:id`

Example request body:

```json
{
  "venue": "Main Auditorium",
  "capacity": 80
}
```

Success: `200 OK`

### 5. Delete Event

**DELETE** `/:id`

Success: `200 OK`

## Search and Filtering

Search by name:

`GET /?search=hackathon`

Filter by venue:

`GET /?venue=auditorium`

Filter by status:

`GET /?status=upcoming`

Allowed statuses:

- `upcoming`
- `ongoing`
- `completed`
- `cancelled`

## Pagination

`GET /?page=1&limit=10`

- `page` = page number
- `limit` = number of events per page

## Sorting

Ascending:

`GET /?sort=startDate&order=asc`

Descending:

`GET /?sort=startDate&order=desc`

## Validation and Business Rules

- Name, start date, end date, venue and capacity are required.
- Event cannot start in the past.
- End date must be after start date.
- Capacity must be greater than 0.
- Duplicate events are rejected with `409 Conflict`.
- Completed events cannot be updated or deleted.

## HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Event created |
| 400 | Invalid request / validation error |
| 404 | Event not found |
| 409 | Business rule conflict |
| 500 | Unexpected server error |

## Error Response

```json
{
  "success": false,
  "message": "Event not found"
}
```
