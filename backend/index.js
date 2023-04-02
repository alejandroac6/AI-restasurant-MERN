import express from "express"
import conectarDB from "./conifg/db.js"
const app=express()

conectarDB()

console.log('estoy haciendo pruebas')
app.listen(4000,()=>{
    console.log('Estoy en el puerto 4000')
})
