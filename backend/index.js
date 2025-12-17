import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import cors from 'cors'
dotenv.config(); 

const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use(express.json());

app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Hello Study");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
