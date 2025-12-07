## Backend (Express + MongoDB)

This service exposes authentication and task APIs so the React client no longer depends on static JSON.

### Quick start

1. Copy `env.example` to `.env` and provide your MongoDB connection string plus a random `JWT_SECRET`.
2. Install dependencies (already done if you ran `npm install`):

   ```bash
   cd backend
   npm install
   ```

3. (Optional) Seed demo users/tasks that match the current frontend placeholders:

   ```bash
   node ./src/seed/seedUsers.js
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   The API listens on `http://localhost:5000` by default.

### API overview

- `POST /api/auth/register` – create an admin or employee (hashes password with bcrypt).
- `POST /api/auth/login` – returns `{ user, token }`. Include `Authorization: Bearer <token>` for protected routes.
- `GET /api/auth/me` – fetch the current user.
- `GET /api/tasks` – employees get their own tasks; admins can supply `?userId=<employeeId>` to inspect others.
- `GET /api/tasks/team/snapshot` – admin-only view with aggregated task counts.
- `POST /api/tasks` – admin-only task creation (`employeeId`, `title`, `description`, `dueDate`, `status`).
- `PATCH /api/tasks/:taskId` – update task status (employees affect their tasks, admins can pass `employeeId`).

All routes respond with JSON. CORS is limited to `CLIENT_ORIGIN` (defaults to `http://localhost:5173`).

