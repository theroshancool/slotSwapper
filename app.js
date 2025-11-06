import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import swapRoutes from "./routes/swapRoutes.js"


const app = express();

const PORT = 5000;

dotenv.config();

// database connection
connectDB();


// middlewares

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


// authroutes
app.use("/api", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", swapRoutes);



app.get("api/", async (req, res) => {
  res.json({"user": ["user", "userTwo", "userThree"]});
});

app.listen(PORT, () => {
  console.log(`SlotSwapper sever is running on port http://localhost:${PORT}`);
});

export default app;
