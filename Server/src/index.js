import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth/usersRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Klientens URL
  credentials: true, // Tillåter cookies att skickas
}));
app.use(cookieParser())
app.use(express.json());


app.use(authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
