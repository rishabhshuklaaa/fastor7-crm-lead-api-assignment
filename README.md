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


# Fastor – Mobile-First Food Delivery Frontend

A pixel-perfect, mobile-first React implementation of the Fastor food delivery application. Built with a clean UI/UX, authentication flow, protected routing, and graceful API error handling.

## Tech Stack

- **React (Vite):** Fast development environment and build tooling.
- **React Router DOM:** Navigation and protected routes.
- **Axios:** API requests with interceptors for token injection and 401 error handling.
- **Context API:** Global state management for user authentication.
- **Plain CSS:** Scoped, mobile-first styling with a maximum width of 420px.

## Features

### 1. Authentication Flow

**Sign Up (`/login`)**
- Accepts a 10-digit phone number.
- Validates phone number input.
- Displays loading and error states.
- Calls the registration API to trigger OTP verification.

**OTP Verification (`/otp`)**
- Six-digit OTP input with 3+3 visual grouping.
- Automatic focus navigation between input fields.
- Backspace navigation and paste support.
- 30-second countdown timer with a Resend OTP option.
- Uses the login API to verify OTP.
- Stores the JWT token in `localStorage`.
- Redirects authenticated users to the home page.
- Default OTP for testing: `123456`.

### 2. Home Dashboard (`/home`)

**Header and Search**
- Displays the current location.
- Custom search bar with gradient action buttons.

**Best Sellers**
- Horizontally scrollable food carousel.
- Food item cards with price tags.

**Promotional Banner**
- Figma-inspired promotional banner.
- Split layout with 47% text and 53% image.
- Custom typography and decorative hollow rings.
- Five pill-shaped carousel indicators.

**Popular Items**
- Custom order-history layout.
- Aligned item prices and counts.
- Order actions: Cancel Order and Track Driver.

**Restaurants**
- Fetches restaurant data from the Fastor API.
- Supports pagination using Previous and Next controls.
- Handles API errors, including 502 Bad Gateway responses.
- Provides fallbacks for missing addresses and broken restaurant logos.

### 3. Item Detail Page (`/item/:id`)

- Displays a large, rounded hero image of the selected dish.
- Shows item pricing.
- Quantity stepper with a default quantity of 3.
- Personal portion selection with custom radio buttons.
- Jumbo portion selected by default.
- Add to Cart functionality with alert-state management.

## Project Structure

```text
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   └── restaurantApi.js
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Otp.jsx
│   │   ├── Home.jsx
│   │   └── ItemDetail.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── package.json
```

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation

**1. Navigate to the frontend directory**

```bash
cd frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open the application**

Navigate to:

```text
http://localhost:5173
```

## API Integration

**Base URL:** `https://staging.fastor.ai/v1`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/pwa/user/register` | Registers a user and triggers OTP verification |
| POST | `/pwa/user/login` | Verifies OTP and authenticates the user |
| GET | `/m/restaurant?city_id=118&page=N` | Fetches paginated restaurant data |

### Request Details

**Register User**

- Method: `POST`
- Endpoint: `/pwa/user/register`
- Body: `phone`, `dial_code`
- Content type: `application/x-www-form-urlencoded`

**Login User**

- Method: `POST`
- Endpoint: `/pwa/user/login`
- Body: `phone`, `otp`, `dial_code`
- Content type: `application/x-www-form-urlencoded`
- Authentication token is retrieved from `res.data.data.token`.

**Fetch Restaurants**

- Method: `GET`
- Endpoint: `/m/restaurant?city_id=118&page=N`
- Header: `Authorization: Bearer <token>`
- Supports pagination through the `page` query parameter.

## Error Handling

The application includes graceful handling for common API and data issues.

- **502 Bad Gateway:** Displays a friendly error message when the staging API is unavailable and allows users to retry.
- **Missing Addresses:** Displays `Address not available` when the API returns a null address.
- **Broken Restaurant Logos:** Uses a local placeholder image when a restaurant logo fails to load.
- **Authentication Errors:** Axios interceptors handle 401 responses and token-related authentication issues.
- **Loading and Error States:** Provides appropriate feedback during API requests and failures.

## Design Principles

- Mobile-first responsive design.
- Maximum application width of 420px.
- Clean, consistent spacing and typography.
- Reusable React components.
- Protected routes for authenticated pages.
- Graceful API failure handling.
- Consistent user experience across authentication and food-ordering flows.

## License

This project was developed as part of a frontend development assignment for the Fastor food delivery application.
