import express, { json } from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorModdleware.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(errorHandler);
app.use(cors({
  origin: [
    "https://notes-mern-neon.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

));
app.use(json());
app.use("/api/auth", authRoutes);
// routes
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

export default app;