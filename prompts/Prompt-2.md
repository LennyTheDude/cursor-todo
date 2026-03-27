You are continuing work on an existing fullstack To-Do application with:

* React + Vite + TypeScript frontend
* Node.js + Express + TypeScript backend
* MongoDB with mongoose
* Layered architecture: routes → controllers → services → models

The app currently supports CRUD for todos (no authentication).

Your task is to add **JWT authentication** and ensure **users only access their own todos**.

---

## 🧱 High-level requirements

* Add user registration & login
* Use **JWT (JSON Web Tokens)** for authentication
* Hash passwords securely (bcrypt)
* Associate each Todo with a specific user
* Restrict all Todo operations to the authenticated user

---

## 📦 New Data Model

### User model

Create a User entity with:

* id
* email (string, required, unique)
* password (hashed)
* createdAt

---

## 🔐 Authentication API

Add endpoints:

* POST /auth/register

  * body: { email, password }
  * hash password before saving
  * return JWT

* POST /auth/login

  * body: { email, password }
  * validate credentials
  * return JWT

---

## 🔑 JWT Details

* Use a secret from environment variables
* Token payload should include:

  * userId
* Set reasonable expiration (e.g. 1h or 7d)

---

## 🛡 Middleware

Create an auth middleware:

* Reads JWT from Authorization header: `Bearer <token>`
* Verifies token
* Attaches `req.user = { userId }`
* Rejects unauthorized requests

---

## 🔄 Update Todo Model

Modify Todo schema:

* Add `userId` field (ObjectId, required)

---

## 🔒 Secure Todo API

Update all Todo logic:

* When creating a todo:

  * attach `userId` from req.user

* When fetching todos:

  * only return todos for that user

* When updating/deleting:

  * ensure todo belongs to the user
  * otherwise return 403

---

## 🏗 Backend Structure Updates

Add:

* models/user.model.ts
* services/auth.service.ts
* controllers/auth.controller.ts
* routes/auth.routes.ts
* middleware/auth.middleware.ts

Keep the same layered structure:

* routes → controllers → services

---

## 🌐 Frontend Changes

### Auth UI

Create simple pages:

* Login page
* Register page

Fields:

* email
* password

---

### Auth State

* Store JWT in localStorage
* Create a simple auth helper:

  * getToken()
  * setToken()
  * removeToken()

---

### API Integration

* Attach JWT to all requests:
  Authorization: Bearer <token>

---

### Routing

* If user is NOT authenticated → show login/register
* If authenticated → show todo app

---

## 🔄 Todo UI Changes

No major UI changes needed, but now:

* All requests must include token
* Data is user-specific

---

## ⚙️ Constraints

* Keep implementation simple
* Do NOT introduce complex auth frameworks (no Passport, no OAuth)
* Do NOT over-engineer roles/permissions
* Keep middleware clean and minimal

---

## 🪜 Execution Plan

Follow steps strictly:

1. Create User model
2. Implement auth service (hashing + JWT)
3. Implement auth controller
4. Add auth routes
5. Create auth middleware
6. Update Todo model with userId
7. Secure Todo endpoints
8. Test backend manually
9. Add frontend auth pages
10. Store and use JWT
11. Protect routes in frontend
12. Verify end-to-end flow

At each step:

* Show only relevant file changes
* Keep changes minimal

---

## ✅ Final Result

* Users can register & log in
* JWT is used for authentication
* Each user only sees their own todos
* Unauthorized access is blocked
* Clean, consistent architecture is preserved

---
