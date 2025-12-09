import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import loginRoutes from './routes/loginRoutes.js'
import dbconnect from './config/dbconnect.js'
import categoryRoutes from './routes/categoryRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
const app=express()
dotenv.config()
dbconnect()

app.use(express.json())
app.use(cors())
app.use('/api',loginRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api',bookRoutes)
app.listen(3000,()=>{
    console.log("Server running at port 3000")
})