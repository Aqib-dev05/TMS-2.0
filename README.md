# Task Management System (TMS)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks between administrators and employees. Features a modern glassmorphic UI with role-based access control, real-time task tracking, and secure authentication.

## 🚀 Features

### For Administrators
- **Task Management**: Create and assign tasks to employees
- **Team Overview**: Monitor workload distribution across the team
- **Profile Settings**: Update name, email, and password via profile modal
- **Real-time Updates**: View live team statistics and task counts

### For Employees
- **Task Dashboard**: View all assigned tasks with status tracking
- **Task Actions**: Accept, complete, or mark tasks as failed
- **Task Statistics**: See counts for new, active, completed, and failed tasks
- **Profile Settings**: Manage personal information through profile modal

### General Features
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Role-Based Access**: Separate dashboards for admin and employee roles
- **Responsive Design**: Modern glassmorphic UI that works on all devices
- **Real-time Updates**: Live data synchronization between frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing


## 🔧 Installation

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tms
JWT_SECRET=your-secret-key-here
CLIENT_ORIGIN=http://localhost:5173
SEED_ADMIN_PASSWORD=123
```

**For MongoDB Atlas**, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tms?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional, defaults to `http://localhost:5000/api`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database (Optional)

Populate the database with demo users and tasks:

```bash
cd backend
node src/seed/seedUsers.js
```

This creates:
- **Admin**: `admin@example.com` / `123`
- **Employees**: `e1@example.com` through `e5@example.com` / `123` (each with sample tasks)

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/me` | Update profile (name, email, password) | Yes |

### Tasks

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/tasks` | Get user's tasks | Yes | Employee/Admin |
| GET | `/api/tasks/team/snapshot` | Get team workload stats | Yes | Admin |
| POST | `/api/tasks` | Create new task | Yes | Admin |
| PATCH | `/api/tasks/:taskId` | Update task status | Yes | Employee/Admin |

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side validation for all inputs
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: Admin and employee role separation



**Made with ❤️ using the MERN stack**

