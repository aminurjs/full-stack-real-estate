import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: "Oops! The page you're looking for does not exist.",
    error: 404,
  });
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the Server!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
