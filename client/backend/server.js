import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import loginRoutes from './routes/loginRoutes.js'
import dbconnect from './config/dbconnect.js'

const app=express()
dotenv.config()
dbconnect()

app.use(express.json())
app.use(cors())
app.use('/api',loginRoutes)

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server running at port 5000")
})