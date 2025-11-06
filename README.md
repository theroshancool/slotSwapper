
---

## 🕐 Slot Swapper API

**Slot Swapper** is a **peer-to-peer time-slot scheduling application** that enables users to **swap calendar slots** securely and efficiently.
Built using **Node.js**, **Express.js**, and **MongoDB**, it demonstrates secure JWT-based authentication, modular API design, and robust swap transaction logic.

---

### 🚀 Tech Stack

| Category                   | Technologies                         |
| -------------------------- | ------------------------------------ |
| **Runtime**                | Node.js (ES Modules)                 |
| **Framework**              | Express.js                           |
| **Database**               | MongoDB + Mongoose ODM               |
| **Authentication**         | JWT (JSON Web Tokens)                |
| **Environment Management** | dotenv                               |
| **Security**               | bcrypt.js, Token-based Authorization |

---

### 📁 Project Structure

```
SlotSwapper/
│
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   └── swapController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Event.js
│   └── SwapRequest.js
│
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── swapRoutes.js
│
├── server.js
├── .env
└── package.json
```

---

### 🔐 Authentication Middleware

Handles JWT verification for all protected routes:

```js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
```

---

### 🔄 Swap Routes

| Method | Endpoint                       | Description                              | Auth Required |
| ------ | ------------------------------ | ---------------------------------------- | ------------- |
| `GET`  | `/api/swaps/swappable-slots`   | Get all swappable slots from other users | ✅             |
| `POST` | `/api/swaps/swap-request`      | Create a new swap request                | ✅             |
| `POST` | `/api/swaps/swap-response/:id` | Respond (accept/reject) to swap requests | ✅             |

---

### 🗓 Event Routes

| Method   | Endpoint          | Description                        | Auth Required |
| -------- | ----------------- | ---------------------------------- | ------------- |
| `GET`    | `/api/events`     | Fetch all events of logged-in user | ✅             |
| `POST`   | `/api/events`     | Create a new calendar event        | ✅             |
| `PUT`    | `/api/events/:id` | Update event details or status     | ✅             |
| `DELETE` | `/api/events/:id` | Delete a user event                | ✅             |

---

### ⚙️ Environment Variables

Create a `.env` file in the project root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_SECRET=your_jwt_secret_key
```

---

### 🧩 Setup Instructions

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/SlotSwapper.git

# 2️⃣ Move into the project directory
cd SlotSwapper

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create a .env file (see above)

# 5️⃣ Start the development server
npm run dev
```

Server runs at → `http://localhost:5000`

---

### 💡 Developer Notes

> I developed **SlotSwapper** to showcase my backend skills in **API design, authentication, and transactional logic**.
> While this submission focuses on backend architecture, I’m actively learning **frontend development (React.js)** to build the full interactive user interface for slot swapping and calendar visualization.
>
> My key strengths include **secure backend design**, **data modeling**, and **logical problem-solving**, and I’m passionate about turning real-world challenges into clean, maintainable systems.
> This project reflects the kind of backend and system-level work I enjoy and aim to grow in professionally.

---

### 🧭 Future Scope (Backend Architecture & Scalability Plan)

* **Frontend Integration (React):**
  Connect this backend with a modern frontend for a full-stack scheduling experience with a calendar view and real-time slot updates.

* **Real-time Notifications (WebSockets):**
  Implement Socket.io for live updates — instantly notify users when they receive swap requests or responses.

* **Role-based Access Control (RBAC):**
  Introduce admin/moderator roles for managing events, users, and conflicts.

* **Microservices & Event-Driven Architecture:**
  Separate authentication, events, and swap services for scalability, using message brokers like RabbitMQ or Redis.

* **Containerization with Docker:**
  Add `Dockerfile` and `docker-compose.yml` for consistent environment setup and easier deployment.

* **Testing & CI/CD:**
  Write unit/integration tests (Jest or Mocha) and configure GitHub Actions for automated testing.

* **Cloud Deployment:**
  Deploy backend to **Render/Heroku** and frontend to **Vercel/Netlify** for public demo access.

---

### 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

Would you like me to add a short **“About Me for Recruiters”** section (like your previous project — e.g., 2–3 lines about you and your profile link)? It gives a personal touch for internship submissions.
