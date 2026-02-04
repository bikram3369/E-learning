// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js";
// import purchaseRoute from "./routes/purchaseCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";

// dotenv.config({});

// // call database connection here
// connectDB();
// const app = express();

// const PORT = process.env.PORT || 3000;

// // default middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));
 
// // apis
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);
 
 
// app.listen(PORT, () => {
//     console.log(`Server listen at port ${PORT}`);
// })


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ FIRST: Webhook route BEFORE json() middleware
app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  purchaseRoute
);

// ⭐ THEN: normal JSON parser for all other routes
app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "https://e-learning-wj3h.vercel.app",
    credentials: true,
  })
);

// ⭐ Other API routes AFTER json()
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
