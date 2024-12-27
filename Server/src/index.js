import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/auth/usersRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: "true"}));


app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
