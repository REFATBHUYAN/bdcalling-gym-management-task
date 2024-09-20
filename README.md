# Gym Management System

## Project Overview

This project is a Gym Management System that allows gym administrators to manage gym classes, trainers, and member bookings. The system includes features for creating and scheduling gym classes, managing trainer profiles, and allowing members to book classes. Administrators can log in to manage these functionalities.

---

---

## Technology Stack

- **Frontend**: None (this is a backend-focused project)
- **Backend**: 
  - TypeScript
  - Express.js
  - Mongoose (MongoDB ORM)
  - MongoDB
  - JWT (JSON Web Token) for authentication
- **API Documentation**: Swagger
- **Environment Variables**: Dotenv

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description                       | Parameters                      | Response                          |
|--------|--------------------|-----------------------------------|----------------------------------|-----------------------------------|
| POST   | `/api/auth/register`| Register a new user               | `name`, `email`, `password`, `role` | Success or error message          |
| POST   | `/api/auth/login`   | Log in a user (returns JWT)       | `email`, `password`              | JWT token or error message        |

### Class Management (Admin Only)

| Method | Endpoint              | Description                         | Parameters                  | Response                              |
|--------|-----------------------|-------------------------------------|------------------------------|---------------------------------------|
| GET    | `/api/class/`          | Get all available classes           | None                         | List of classes                      |
| POST   | `/api/class/`          | Create a new class                  | `name`, `trainer`, `schedule` | Success message or error              |
| PUT    | `/api/class/:id`       | Update a class                      | Class properties              | Success message or error              |
| DELETE | `/api/class/:id`       | Delete a class                      | None                         | Success message or error              |

### Trainer Management (Admin Only)

| Method | Endpoint             | Description                        | Parameters                          | Response                             |
|--------|----------------------|------------------------------------|-------------------------------------|--------------------------------------|
| GET    | `/api/class/trainers` | Get all trainers                   | None                                | List of trainers                     |
| POST   | `/api/class/trainers` | Add a new trainer                  | `name`, `email`, `expertise`, `bio` | Success message or error             |
| PUT    | `/api/class/trainers/:id` | Update a trainer's profile    | Trainer properties                  | Success message or error             |
| DELETE | `/api/class/trainers/:id` | Delete a trainer's profile    | None                                | Success message or error             |

### Member Booking (Members Only)

| Method | Endpoint               | Description                       | Parameters           | Response                          |
|--------|------------------------|-----------------------------------|----------------------|-----------------------------------|
| POST   | `/api/class/book/:id`   | Book a class                      | `classId`, `userId`  | Booking confirmation              |
| GET    | `/api/class/my-bookings`| View member's bookings            | `userId`             | List of member's bookings         |

---

## Database Schema

### User Model

```typescript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['Admin', 'Trainer', 'Member'] }
});
```

### Class Model

```typescript
const classSchema = new mongoose.Schema({
  name: String,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  schedule: Date,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
```

### Trainer Model

```typescript
const trainerSchema = new mongoose.Schema({
  name: String,
  email: String,
  expertise: String,
  bio: String,
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});
```

---

## Instructions to Run Locally

### Prerequisites

- **Node.js** installed (v14 or later)
- **MongoDB** installed and running locally
- **Git** installed

### Step-by-step Guide

1. **Clone the repository:**

    ```bash
    git clone https://github.com/REFATBHUYAN/bdcalling-gym-management-task
    cd gym-management-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following values:

    ```
    MONGO_URI=mongodb://localhost:27017/gym-management
    JWT_SECRET=your_secret_key
    PORT=3000
    ```

4. **Run the server:**

    ```bash
    npm run dev
    ```

5. **Access the app:**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Swagger API Docs

Access the API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## Live Hosting Link

*live Link [https://bdcalling-gym-management-task.vercel.app](https://bdcalling-gym-management-task.vercel.app)*

---


### Key Features to Test

- **Create Trainers**: Log in as an admin and create new trainers using the `/api/class/trainers` endpoint.
- **Schedule Classes**: Log in as an admin and create new classes using the `/api/class` endpoint.
- **Booking Classes**: Log in as a member, browse available classes, and book one using the `/api/class/book/:id` endpoint.