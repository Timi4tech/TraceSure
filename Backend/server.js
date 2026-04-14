import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";



import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import stageRoutes from "./routes/stageRoutes.js"
import templateRoutes from "./routes/templateRoutes.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
;



app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/stages", stageRoutes)
app.use("/api/templates", templateRoutes)

app.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))