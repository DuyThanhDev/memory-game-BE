# Memory Game Backend

Backend API for a memory card game application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login)
- JWT token-based authorization
- Score tracking system
- Admin capabilities for user management
- RESTful API design
- Swagger API documentation

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token

### Score Routes

- `GET /api/scores` - Get user's scores (authenticated)
- `POST /api/scores` - Save a new score (authenticated)
- `GET /api/scores/top/:level` - Get top scores for a specific level
- `DELETE /api/scores/:id` - Delete a score (admin only)

### User Routes

- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `GET /api/users` - Get all users (admin only)

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the required environment variables:
   - PORT (default: 5000)
   - MONGO_URI (MongoDB connection string)
   - JWT_SECRET (for JSON Web Token)
4. Run the server:
   - Development: `npm run dev`
   - Production: `npm start`
5. Access the API documentation at `http://localhost:5000/api-docs`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js for password hashing
- Swagger UI for API documentation
