import express from "express"
import dotenv from 'dotenv'
import conectarDB from "./conifg/db.js"
import usuarioRoutes from './routes/usuarioRoutes.js'

const app=express()
app.use(express.json())

dotenv.config()

conectarDB()

//Routing , siempre nos referiremos a app, que es el que contiene toda la configuracion de Express

app.use("/api/usuarios",usuarioRoutes)

const PORT = process.env.PORT

console.log('estoy haciendo pruebas')
app.listen(PORT,()=>{
    console.log('Estoy en el puerto 4000')
})
