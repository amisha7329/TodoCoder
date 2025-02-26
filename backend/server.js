const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
require("./auth/passport-config"); 
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", taskRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
