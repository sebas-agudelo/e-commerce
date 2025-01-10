import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth/usersRoutes.js";
import { productsRouter } from "./routes/products/productsRouter.js";
import { paymentRouter } from "./routes/payment/paymentRouter.js";
import { cartRouter } from "./routes/cartRouter/CartRouter.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://examensarbeten.vercel.app/",
  credentials: true, 
}));
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Hello word")
})


app.use(authRouter);
app.use(productsRouter);
app.use(paymentRouter);
app.use(cartRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
