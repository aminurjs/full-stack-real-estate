import express from "express";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the Home Page!");
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: "Oops! The page you're looking for does not exist.",
    error: 404,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
