# SafarSathi — Travel Itinerary Builder

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## Overview


SafarSathi is a full stack travel itinerary planning web application. It consolidates trip planning, activity scheduling, budget tracking, and itinerary sharing into a single platform — replacing the need for multiple disconnected tools.

Built with React.js, Node.js, Express.js, and MongoDB as part of a Full Stack Hackathon project.

---

## Features

- **Authentication** — Secure register, login, and logout using JWT. Protected routes for authenticated users.
- **Trip Management** — Create, view, edit, and delete trips with destination, date range, and budget.
- **Day-wise Itinerary** — Plan activities for each day of a trip with type, location, time, and cost.
- **Budget Tracker** — Track expenses per trip with category breakdown, progress bar, and over-budget alerts.
- **Budget Chart** — Visual donut chart showing spending by category using Recharts.
- **Search, Filter and Sort** — Search trips by title or destination, filter by status, sort by date or budget.
- **Debouncing** — Search input is debounced at 500ms to reduce unnecessary API calls.
- **Pagination** — Trip list paginated at 6 per page with page number navigation.
- **Form Validation** — Real-time validation with error messages and field state indicators.
- **Toast Notifications** — Success and error notifications using react-hot-toast.
- **Public Trip Sharing** — Generate a public read-only link for any trip. No login required for viewers.
- **Dark and Light Mode** — Theme toggle persisted in localStorage.
- **Responsive Design** — Fully responsive UI for mobile, tablet, and desktop.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, Tailwind CSS, Redux Toolkit, React Router DOM v6 |
| State Management | Redux Toolkit with async thunks |
| HTTP Client | Axios with JWT interceptor |
| Charts | Recharts |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens) |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## Folder Structure

```
safarsathi/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, profile
│   │   ├── tripController.js      # Trip CRUD with search/filter/pagination
│   │   ├── activityController.js  # Activity CRUD
│   │   ├── expenseController.js   # Expense CRUD with summary
│   │   └── publicController.js    # Public trip view by token
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── errorMiddleware.js     # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Trip.js
│   │   ├── Activity.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── activityRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── publicRoutes.js
│   │   └── index.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── TripCard.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── BudgetChart.jsx
    │   │   ├── ActivityCard.jsx
    │   │   ├── ExpenseTable.jsx
    │   │   └── ConfirmModal.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── hooks/
    │   │   ├── useDebounce.js
    │   │   └── useScrollAnimation.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── CreateTrip.jsx
    │   │   ├── TripDetails.jsx
    │   │   ├── Trips.jsx
    │   │   └── PublicTripView.jsx
    │   ├── redux/
    │   │   ├── store.js
    │   │   ├── authSlice.js
    │   │   ├── tripSlice.js
    │   │   ├── activitySlice.js
    │   │   └── expenseSlice.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## Prerequisites

- Node.js v18 or above
- npm v9 or above
- MongoDB Atlas account (or local MongoDB)

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mananjani2102/safarsathi.git
cd safarsathi
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

Backend will run at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at `http://localhost:3000`

---

## Environment Variables

### Backend

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

---

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login and get JWT token | No |
| GET | `/auth/profile` | Get logged in user profile | Yes |

**Register Request:**
```json
{
  "name": "Manan Jani",
  "email": "manan@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc...",
    "name": "Manan Jani",
    "email": "manan@example.com"
  }
}
```

---

### Trip Routes — `/api/trips`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/trips` | Get all trips (search, filter, sort, paginate) | Yes |
| POST | `/trips` | Create new trip | Yes |
| GET | `/trips/:id` | Get single trip | Yes |
| PUT | `/trips/:id` | Update trip | Yes |
| DELETE | `/trips/:id` | Delete trip | Yes |

**Query Parameters for GET `/trips`:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by title or destination |
| `status` | string | Filter by upcoming, ongoing, completed |
| `sort` | string | newest, oldest, budget_high, budget_low |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 6) |

**GET `/trips` Response:**
```json
{
  "trips": [...],
  "totalTrips": 18,
  "totalPages": 3,
  "currentPage": 1
}
```

**Create Trip Request:**
```json
{
  "title": "Goa Beach Trip",
  "destination": "Goa, India",
  "startDate": "2024-12-20",
  "endDate": "2024-12-27",
  "totalBudget": 25000
}
```

---

### Activity Routes — `/api/activities`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/activities/:tripId` | Get all activities for a trip | Yes |
| POST | `/activities` | Add activity to trip | Yes |
| PUT | `/activities/:id` | Update activity | Yes |
| DELETE | `/activities/:id` | Delete activity | Yes |

**Create Activity Request:**
```json
{
  "tripId": "64abc...",
  "day": 1,
  "title": "Beach Walk",
  "location": "Calangute Beach",
  "time": "07:00",
  "category": "sightseeing",
  "cost": 0,
  "notes": "Morning walk along the beach"
}
```

---

### Expense Routes — `/api/expenses`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/expenses/:tripId` | Get all expenses for a trip | Yes |
| POST | `/expenses` | Add expense | Yes |
| PUT | `/expenses/:id` | Update expense | Yes |
| DELETE | `/expenses/:id` | Delete expense | Yes |

**Create Expense Request:**
```json
{
  "tripId": "64abc...",
  "title": "Hotel Stay",
  "amount": 4500,
  "category": "hotel",
  "date": "2024-12-20"
}
```

---

### Public Routes — `/api/public`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/public/trip/:id` | Get public trip view by trip ID | No |

---

## Error Handling

All API errors return a consistent JSON response:

```json
{
  "message": "Error description here"
}
```

| Status Code | Meaning |
|-------------|---------|
| `400` | Bad request — missing or invalid input |
| `401` | Unauthorized — invalid or missing token |
| `404` | Not found — resource does not exist |
| `500` | Internal server error |

The backend uses a global error middleware (`errorMiddleware.js`) to catch and format all errors consistently. The frontend uses Axios interceptors to handle API errors and displays them via toast notifications.

---

## Deployment

### Backend — Render

1. Go to [render.com](https://render.com) and create a new Web Service.
2. Connect the GitHub repository.
3. Set the following:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add environment variables in the Render dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `PORT=5000`

### Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) and import the GitHub repository.
2. Set the following:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com/api`

### Database — MongoDB Atlas

1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write access.
3. Whitelist all IPs (`0.0.0.0/0`) for Render compatibility.
4. Copy the connection string and set it as `MONGO_URI`.

---

## Future Improvements

- Edit trip and activity functionality
- Email notifications for upcoming trips
- Google Maps integration for activity locations
- Collaborative trip planning with multiple users
- Export itinerary as PDF
- Mobile app using React Native

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request to `codinggita/safarsathi` — `main` branch.

Please ensure your code follows existing patterns, has no console errors, and is tested before submitting a PR.

---

## License

This project is licensed under the MIT License.

---

## Author

**Manan Jani**

Built with dedication for the Full Stack Hackathon — CodingGita.
