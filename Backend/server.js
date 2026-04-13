import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import csrf from "csurf";


import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import stageRoutes from "./routes/stageRoutes.js"
import templateRoutes from "./routes/templateRoutes.js"

dotenv.config()

const app = express()
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
});
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
;

app.use(csrfProtection);
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ csrfToken: csrfToken });
});

app.use("/api/auth",csrfProtection, authRoutes)
app.use("/api/products",csrfProtection, productRoutes)
app.use("/api/stages", csrfProtection,stageRoutes)
app.use("/api/templates",csrfProtection, templateRoutes)

app.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))