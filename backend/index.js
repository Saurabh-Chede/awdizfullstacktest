import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import mainRouter from "./routes/index.js";

const app = express();
dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("server is working");
});

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/v1', mainRouter);


mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB.");
});

app.listen(8000, () => {
  console.log(`server running on port 8000`);
});
