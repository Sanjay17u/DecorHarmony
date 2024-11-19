import express from "express"
const app = express()
import dotenv from 'dotenv'
import connectDB from "./db/connectDB"
dotenv.config()


const PORT = process.env.PORT || 5000 

app.listen(PORT, () => {
    connectDB()
    console.log(`Server Listen at Port ${PORT}`)
})