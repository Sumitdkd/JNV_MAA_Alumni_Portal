# JNV MAA - Jawahar Navodaya Vidyalaya Mandphia Alumni Association

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application designed to connect and engage the alumni community of **Jawahar Navodaya Vidyalaya Mandphia**.

---

## ✨ Features

* **Secure Authentication**
  JWT-based registration and login system with admin approval workflow.

* **Modern Landing Page**
  A dynamic and scroll-animated landing experience for visitors.

* **Alumni Dashboard**
  Personalized dashboard showing announcements, birthdays, and recent posts.

* **Profile Management**
  Alumni can update personal, academic, and professional info (coming soon: profile picture upload fix).

* **Community Feed**
  Post updates, articles, job alerts, or events — like and comment to engage.

* **Interest-Based Groups**
  Join or create interest groups with integrated real-time chat (feature in progress).

* **Alumni Directory**
  Searchable, filterable private directory of approved alumni.

* **Birthday Highlights**
  Alumni with birthdays today are featured on the dashboard.

* **Admin Panel**
  Admin can approve alumni, manage users, and review feedback.

* **Email Notifications**
  Automatic emails sent when an account is approved.

* **Responsive UI**
  Clean, mobile-first design using Tailwind CSS, built for GenZ aesthetics.

---

## 🛠️ Tech Stack

| Layer              | Tech                                     |
| ------------------ | ---------------------------------------- |
| **Frontend**       | React.js, Tailwind CSS, Heroicons, Axios |
| **Backend**        | Node.js, Express.js, Mongoose            |
| **Database**       | MongoDB (Atlas or Local)                 |
| **Auth**           | JWT, bcrypt                              |
| **File Uploads**   | Multer, Cloudinary (optional)            |
| **Email**          | Nodemailer                               |
| **Real-Time Chat** | Socket.IO (in development)               |

---

## 🚀 Running the Project Locally

### Prerequisites

* Node.js and npm
* MongoDB (Atlas or Local)
* Git

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:

```env
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Start the backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `/frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

* Frontend: [http://localhost:300](http://localhost:3000)1
* Backend: http\://localhost:3000

---

## 👨‍💻 Developed By

**Sumit Dhaker**
Electronics & Communication Engineering
NIT Patna | Batch 2026

Project: JNV MAA - JNV Mandphia Alumni Association
URL : https://jnv-maa-alumni-portal.vercel.app/
