import express from "express"
const app = express()
import dotenv from 'dotenv'
import connectDB from "./db/connectDB"
import bodyParser from "body-parser"
import coockieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/user.route'
import marketplaceRoute from './routes/marketplace.route'
import menuRoute from './routes/menu.route'
// import orderRoute from './routes/order.route'
dotenv.config()


const PORT = process.env.PORT || 5000 

app.use(bodyParser.json({ limit:'10mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended:true, limit:'10mb' }))
app.use(coockieParser())
const corsOption = {
    origin:"http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials:true
}
app.use(cors(corsOption))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');  
    next();
  });
  

// api's
app.use("/api/v1/user", userRoute)
app.use("/api/v1/marketplace", marketplaceRoute)
app.use("/api/v1/menu", menuRoute)
// app.use("/api/v1/order", orderRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server Listen at Port ${PORT}`)
})