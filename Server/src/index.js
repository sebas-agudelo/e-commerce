import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth/usersRoutes.js";
import { productsRouter } from "./routes/products/productsRouter.js";
import { paymentRouter } from "./routes/payment/paymentRouter.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));
app.use(cookieParser())
app.use(express.json());


app.use(authRouter);
app.use(productsRouter);
app.use(paymentRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
