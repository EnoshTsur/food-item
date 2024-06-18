import express from "express";
import connectDB from "./database";
import cors from "cors";
import dotenv from "dotenv";
import foodItemRouter from "./routes/foodItemRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4899;

app.use(express.json());
app.use(cors());
app.use("/api/food-item/", foodItemRouter);

app.listen(PORT, async () => {
  console.log(`Listening to port ${PORT}`);

  await connectDB();
});
