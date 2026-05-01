# 📝 RH Presence Manager

A complete attendance management and HR reporting solution, designed to provide real-time visibility into employee activity.

---

## 🚀 Tech Stack

The project uses a modern **Fullstack TypeScript** architecture:

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), TypeScript, Ant Design, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | PostgreSQL via Prisma ORM |
| **Authentication** | JWT (JSON Web Tokens) & Context API |

---

## 🛠️ Key Features

* **Role Management**: Different access levels for Administrators and Users (USER/ADMIN).
* **Dynamic Dashboard**: Visualization of total hours, average per employee, and active workforce.
* **Attendance Registry**: Interactive data table with real-time search by employee name.
* **Smart Formatting**: Automatic conversion of durations (minutes into readable hours/minutes).
* **Security**: Client-side route protection and server-side role verification middleware.

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL is installed and running

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
### 4. API Documentation Route
```
http://localhost:5000/api-docs/
```
