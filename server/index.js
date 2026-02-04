import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute, { stripeWebhook } from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ WEBHOOK FIRST — DIRECT HANDLER, NOT ROUTER
app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ⭐ THEN enable JSON parser
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-learning-wj3h.vercel.app"
    ],
    credentials: true,
  })
);

// ⭐ NORMAL ROUTES (AFTER JSON)
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
