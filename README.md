# 📦 Inventory Management System

A full-stack Inventory Management System built using the MERN Stack. The application helps businesses manage products, categories, inventory, and users through a secure role-based dashboard.

## 🚀 Live Demo

Frontend: https://inventory-management-system-md3naukj5-sujal-ae1d.vercel.app

Backend API: https://inventory-management-system-9u86.onrender.com/api


## ✨ Features

- 🔐 JWT Authentication
- 👥 Role-Based Access Control (Admin, Manager, Employee)
- 📦 Product Management
- 🗂 Category Management
- 📊 Inventory Tracking
- 👤 User Management
- 📈 Dashboard with Analytics
- 🔍 Search Functionality
- 📄 Pagination
- 🔔 Toast Notifications
- ☁️ Cloud Deployment (Render + Vercel)

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📁 Project Structure

```
Inventory-Management-System
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/inventory-management-system.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://inventory-management-system-9u86.onrender.com/api
```

---

## 👤 Demo Credentials

Email:
```
sujal123456@gmail.com
```

Password:
```
123456
```

---

## 📸 Screenshots

Add screenshots of:
- Login
- Dashboard
- Products
- Categories
- Inventory
- Users

---

## 👨‍💻 Author

**Sujal Raj**

GitHub:
https://github.com/sujalraj03