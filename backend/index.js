import express from "express"
import dotenv from 'dotenv'
import conectarDB from "./conifg/db.js"
import usuarioRoutes from './routes/usuarioRoutes.js'
import autonomoRoutes from './routes/autonomoRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app=express()
app.use(express.json())

dotenv.config()

conectarDB()

//Routing , siempre nos referiremos a app, que es el que contiene toda la configuracion de Express

app.use("/api/usuarios",usuarioRoutes)
app.use("/api/autonomos",autonomoRoutes)
app.use("/api/tasks",taskRoutes)

const PORT = process.env.PORT

console.log('estoy haciendo pruebas')
app.listen(PORT,()=>{
    console.log('Estoy en el puerto 4000')
})
