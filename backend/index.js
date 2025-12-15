import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./router/authRoute.js";
import adminRoute from "./router/jobRoute.js";
import applicationRoute from "./router/applicationRoute.js";
import { DBconnection } from "./utils/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// DB
DBconnection();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://mini-job-portal-system.vercel.app",
  "https://mini-job-portal-system-7gfnqun2k-mdjabed2167-gmailcoms-projects.vercel.app",
  "https://mini-job-portal-system-git-main-mdjabed2167-gmailcoms-projects.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/job", adminRoute);
app.use("/api/job", applicationRoute);

// Test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
