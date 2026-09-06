# Secure Authentication System

A full-stack authentication system built as part of the Growfinix Technology Full-Stack Development Internship (Task 1). It implements user registration, login, and JWT-based route protection using Spring Boot and React.

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA (Hibernate)
- PostgreSQL
- JWT (jjwt library)
- BCrypt password hashing

**Frontend:**
- React (Vite)
- Axios

## Features

- User registration with hashed passwords (BCrypt — passwords are never stored in plain text)
- User login with credential verification
- JWT token generation on successful login
- Protected API routes that require a valid JWT via `Authorization: Bearer <token>` header
- CORS configured to allow frontend-backend communication across ports
- Custom JWT filter that validates tokens on every request to protected routes

## Project Structure

```
task1-auth-system/
├── src/main/java/com/growfinix/task1_auth_system/   # Spring Boot backend
│   ├── Task1AuthSystemApplication.java
│   ├── User.java                 # JPA entity mapped to "users" table
│   ├── UserRepository.java       # Spring Data JPA repository
│   ├── UserService.java          # Registration & login business logic
│   ├── AuthController.java       # REST endpoints (/register, /login, /profile)
│   ├── JwtUtil.java              # JWT generation & validation
│   ├── JwtFilter.java            # Filter that validates tokens per request
│   └── SecurityConfig.java       # Spring Security + CORS configuration
├── pom.xml
├── mvnw / mvnw.cmd
└── frontend/                     # React (Vite) application
    └── src/
        ├── App.jsx
        ├── Register.jsx
        └── Login.jsx
```

## API Endpoints

| Method | Endpoint              | Description                          | Auth Required |
|--------|------------------------|---------------------------------------|----------------|
| POST   | `/api/auth/register`   | Register a new user                   | No             |
| POST   | `/api/auth/login`      | Login and receive a JWT token         | No             |
| GET    | `/api/auth/profile`    | Example protected route               | Yes (Bearer token) |

## How It Works

1. **Registration:** User submits name, email, and password. The backend hashes the password with BCrypt before saving it to PostgreSQL.
2. **Login:** User submits email and password. The backend verifies the password against the stored hash using BCrypt's `matches()` method. On success, a JWT is generated containing the user's email and an expiration time.
3. **Protected Routes:** The frontend stores the JWT (in `localStorage`) and sends it in the `Authorization` header on subsequent requests. A custom `JwtFilter` intercepts every request, validates the token, and allows or denies access accordingly.

## Running Locally

### Backend
```bash
mvnw.cmd spring-boot:run
```
Run this from the project root. Runs on `http://localhost:8080`

**Database setup:** Create a PostgreSQL database named `growfinix_auth` and update credentials in `src/main/resources/application.properties`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## Screenshots

*(Add screenshots of the registration form, login form, and a successful protected-route response here)*

## Author

Janani — Java Full-Stack Intern, Growfinix Technology
