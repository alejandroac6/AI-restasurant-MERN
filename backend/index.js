import express from "express"
const app=express()

console.log('estoy haciendo pruebas')
app.listen(4000,()=>{
    console.log('Estoy en el puerto 4000')
})
