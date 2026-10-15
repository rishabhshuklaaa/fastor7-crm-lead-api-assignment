# CRM Lead Management API

REST API for a CRM system where counselors can view public enquiries and claim them.
Built with Node.js, Express, MongoDB (Mongoose) and JWT.

## Features
- Employee register / login (JWT)
- Public enquiry form API (no auth)
- Fetch unclaimed (public) enquiries
- Claim an enquiry (atomic, one counselor only)
- Fetch enquiries claimed by logged-in employee

## Tech Stack
Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, express-validator

## Setup
1. Clone the repo and install dependencies
```
   npm install
```
2. Create a `.env` file (see `.env.example`)
```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=1d
```
3. Run
```
   npm run dev
```
   Server runs on `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register employee |
| POST | /api/auth/login | No | Login, returns JWT |
| POST | /api/enquiries | No | Submit public enquiry form |
| GET | /api/enquiries/unclaimed | Yes | List unclaimed enquiries |
| PATCH | /api/enquiries/:id/claim | Yes | Claim an enquiry |
| GET | /api/enquiries/my-claimed | Yes | List my claimed enquiries |

Protected routes need header: `Authorization: Bearer <token>`

## Sample Requests

**Register** `POST /api/auth/register`
```json
{ "name": "Rishabh", "email": "rishabh@test.com", "password": "123456" }
```

**Login** `POST /api/auth/login`
```json
{ "email": "rishabh@test.com", "password": "123456" }
```

**Submit enquiry** `POST /api/enquiries`
```json
{ "name": "Amit Sharma", "email": "amit@test.com", "phone": "9876543210", "courseInterest": "Full Stack Development" }
```

## Status Codes
200 OK, 201 Created, 400 Validation error, 401 Unauthorized, 404 Not found, 409 Conflict (already claimed / duplicate email)

## Design Notes
- Claiming uses an atomic `findOneAndUpdate({ _id, claimedBy: null })`, so two counselors cannot claim the same lead.
- Passwords are hashed with bcrypt and never returned in responses.