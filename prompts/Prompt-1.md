You are a senior fullstack engineer working on an existing monorepo with:

* /client → Vite + React + TypeScript app
* /server → Node.js Express app (currently minimal, JS)

Your task is to transform this into a fullstack To-Do application with a clean, simple, but realistic architecture.

---

## 🧱 High-level requirements

### Backend

* Use **Node.js + Express + TypeScript**
* Use **MongoDB**
* Use the **simplest possible MongoDB integration** (prefer mongoose)
* Implement a **layered architecture**:

  * routes (Express)
  * controllers
  * services
  * models
* No authentication (single-user app)

### Frontend

* Keep existing **React + Vite + TypeScript**
* Use **local state only** (no Redux, no React Query)
* Simple UI, no heavy styling libraries

---

## 📦 Data Model

Create a Todo entity with:

* id
* title (string, required)
* description (string, optional)
* completed (boolean, default false)
* createdAt
* updatedAt

---

## 🔌 Backend API

Implement REST endpoints:

* GET /todos

  * supports pagination: ?page=1&limit=10
* GET /todos/:id
* POST /todos
* PUT /todos/:id
* DELETE /todos/:id

---

## 🏗 Backend Structure

Refactor the server into:

server/
src/
app.ts
server.ts
config/
models/
services/
controllers/
routes/

Requirements:

* Convert project to TypeScript
* Add tsconfig.json
* Use async/await
* Centralize error handling
* Keep it simple — no overengineering

---

## 🔄 Frontend Features

Implement:

* List todos
* Create todo
* Update todo (toggle completed + edit title)
* Delete todo
* Pagination controls

Structure:

* components/
* pages/
* api/ (for fetch calls)

---

## 🌐 Frontend API Layer

Create a small API helper:

* getTodos(page, limit)
* createTodo(data)
* updateTodo(id, data)
* deleteTodo(id)

Use fetch (no axios unless already installed)

---

## ⚙️ Integration

* Backend runs on port 3000
* Frontend runs on port 5173
* Configure CORS properly

---

## 🧹 Constraints

* Keep code clean and readable
* Do NOT introduce unnecessary libraries
* Do NOT over-abstract
* Prefer clarity over cleverness
* Keep functions small and focused

---

## 🪜 Execution Plan

Follow these steps strictly:

1. Convert backend to TypeScript
2. Set up MongoDB connection
3. Create Todo model
4. Implement service layer
5. Implement controller layer
6. Implement routes
7. Test API manually (log or simple test)
8. Build frontend API layer
9. Build UI components
10. Connect frontend to backend

At each step:

* Show created/modified files
* Keep changes minimal and focused

---

## ✅ Final Result

A working fullstack To-Do app where:

* Todos persist in MongoDB
* UI interacts with real backend
* Codebase reflects a clean layered structure

---

Start with step 1: converting the backend to TypeScript.
