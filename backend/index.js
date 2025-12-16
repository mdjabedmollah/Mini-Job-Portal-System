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

const corsOption = {

  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));


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
