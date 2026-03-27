You are working on an existing fullstack To-Do application with:

* React + Vite + TypeScript frontend
* Node.js + Express + TypeScript backend
* MongoDB with mongoose
* JWT authentication (users + protected todo routes)
* Layered architecture: routes → controllers → services → models

Your task is to make the backend **production-ready** by adding:

* Input validation
* Structured logging
* Basic automated tests

Keep everything **simple, clean, and realistic** — avoid overengineering.

---

## 🧱 High-level goals

* Prevent invalid data from reaching business logic
* Add visibility into system behavior (logging)
* Ensure core functionality is testable and tested

---

## ✅ 1. Validation Layer

### Requirements

* Validate all incoming request data:

  * auth routes (email, password)
  * todo routes (title, pagination params, etc.)

* Use a simple validation library (prefer **zod** or **joi**)

* Do NOT put validation inside controllers directly

---

### Structure

Add:

* validators/

  * auth.validator.ts
  * todo.validator.ts

---

### Pattern

* Define schemas per route

* Create reusable middleware:

  validate(schema)

* Middleware should:

  * validate req.body / req.query / req.params
  * return 400 with clear error messages if invalid

---

### Example rules

Auth:

* email must be valid
* password min length (e.g. 6)

Todo:

* title required
* completed must be boolean
* page/limit must be numbers

---

## 🪵 2. Logging

### Requirements

* Add structured logging using a lightweight logger (prefer **pino**)
* Log:

  * server start
  * incoming requests
  * errors
  * important actions (e.g. user login, todo creation)

---

### Structure

Add:

* config/logger.ts

---

### Implementation

* Create a logger instance
* Use middleware for request logging
* Replace console.log with logger

---

### Logging rules

* Never log passwords
* Log useful metadata:

  * route
  * method
  * userId (if available)
  * status code

---

## 🧪 3. Testing

### Requirements

* Add basic automated tests for backend
* Focus on core flows:

  * auth (register/login)
  * todo CRUD (with auth)

---

### Stack

* Use:

  * **Jest**
  * **Supertest**

---

### Structure

Add:

* tests/

  * auth.test.ts
  * todo.test.ts

---

### Test expectations

Auth tests:

* register user
* login user
* reject invalid credentials

Todo tests:

* create todo (authenticated)
* fail without token
* fetch only user's todos
* update/delete only own todos

---

### Test setup

* Use a separate test database (or in-memory MongoDB if simple)
* Keep setup minimal and clear

---

## ⚙️ Error Handling Improvements

Enhance global error handler:

* Standardize error response format:
  {
  message: string,
  statusCode: number
  }

* Handle:

  * validation errors
  * JWT errors
  * Mongo errors

---

## 🔒 Small Production Improvements

* Add `.env` support (dotenv)
* Move config values:

  * JWT secret
  * DB connection string
  * PORT

---

## 🧹 Constraints

* Do NOT introduce heavy frameworks
* Keep abstractions minimal
* Prefer simple middleware over complex patterns
* Avoid excessive boilerplate

---

## 🪜 Execution Plan

Follow steps strictly:

1. Add validation library

2. Create validation schemas

3. Implement validation middleware

4. Apply validation to routes

5. Add logger setup

6. Replace console logs

7. Add request logging middleware

8. Set up Jest + Supertest

9. Write auth tests

10. Write todo tests

11. Improve error handling

12. Add environment config

At each step:

* Show only relevant file changes
* Keep diffs small and focused

---

## ✅ Final Result

* All inputs are validated before reaching controllers
* Logs are structured and useful
* Core flows are covered by tests
* App is significantly closer to production quality

---

Start with step 1: adding a validation library and setting up the validation structure.
