import db from "./db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import claimRouter from "./routes/claimRoutes.js";
import couponRouter from "./routes/couponRoutes.js"
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://coupon-distribution-web-app-ecmj.vercel.app"], // ✅ Allow both local and deployed frontend
    credentials: true, // Allow cookies & authentication headers
}));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

app.use("/api/admin",adminRouter);
app.use("/api/claim",claimRouter);
app.use("/api/coupon",couponRouter);


app.get('/' , (req,res) => {
    res.send("server is running");
})

export default app;