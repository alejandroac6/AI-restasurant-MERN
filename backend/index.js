import express from "express"
import dotenv from 'dotenv'
import conectarDB from "./conifg/db.js"

const app=express()

dotenv.config()

conectarDB()

const PORT = process.env.PORT

console.log('estoy haciendo pruebas')
app.listen(PORT,()=>{
    console.log('Estoy en el puerto 4000')
})
