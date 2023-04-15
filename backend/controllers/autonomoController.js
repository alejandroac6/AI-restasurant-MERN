import mongoose from "mongoose"
import Autonomo from "../models/Autonomo.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"


const registrarAutonomo = async(req,res)=>{

    // evitar usuarios duplicados
    const {email}=req.body

    const autonomoExiste=await Autonomo.findOne({email})

    if (autonomoExiste) {
        const error=new Error('Autonomo ya registrado')
        return res.status(400).json({msg:error.message})        
    }

    try {
        // crea un nuevo autonomo, le damos un token inicial que se utilizara despues para autenticarlo
        
        const autonomo= new Autonomo(req.body)
        autonomo.token=generarId()

        // lo ponemos dentro de la base de datos

        const autonomoAlmacenado= await autonomo.save()
        res.json(autonomoAlmacenado)

    } catch (error) {
        console.log(error)
        
    }

    
    
}

const autenticarAutonomo = async(req,res)=>{


}

const confirmarCuenta = async(req,res)=>{
    const {token}=req.params
    const autonomoConfirmar = await Autonomo.findOne({token})

    if (!autonomoConfirmar) {
        const error =  new Error('Autonomo no existente')
        return res.status(404).json({msg:error.message})
    }

    try {
        autonomoConfirmar.confirmado=true
        // Le quitamos el token generado mediante operaciones, cuando haga login le daremos un JWT
        autonomoConfirmar.token=""
        res.json({msg:'Autonomo confirmado correctamente'})
        
    } catch (error) {
        console.log(error)
        
    }

}

const olvidePassword = async(req,res)=>{

}

const comprobarToken = async(req,res)=>{

}

const nuevoPassword = async(req,res)=>{

}

const perfilAutonomo = async(req,res)=>{

}




export {registrarAutonomo,
    autenticarAutonomo,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfilAutonomo
}