import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth/usersRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));
app.use(cookieParser())
app.use(express.json());


app.get("/", (req, res) => res.send("Express och vercel är bästt"));

app.use(authRouter);


app.listen(3030, () => console.log("Server ready on port 3030."));