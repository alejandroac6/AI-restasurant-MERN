import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


const registrarUsuario = async(req,res)=>{
    // Evitar registros duplicados
    const {email}=req.body;
    const existeUsuario=await Usuario.findOne({email:email})

    if (existeUsuario) {
        const error=new Error('Ususario ya registrado')
        return res.status(400).json({msg:error.message})
    }

    try {
        // crea un nuevo usuario
        const usuario=new Usuario(req.body)
        usuario.token=generarId()

        // lo insertamos en la base de datos
        const usuarioAlmacenado= await usuario.save()
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
        
    }
    // {nombre,password,email}=req.body
    
};

const autenticarUsuario=async(req,res)=>{
    const {email,password}=req.body
    // comprobar si el usuario existe
    const usuario= await Usuario.findOne({email})

    if (!usuario) {
        const error= new Error('El Usuario no existe')
        return res.status(404).json({msg: error.message})
    }
    // comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error= new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({msg: error.message})
    }

    // comprobar password
    if (await usuario.comprobarPassword(password)) {
        res.json({
        _id:usuario._id,
        nombre: usuario.nombre,
        email:usuario.email,
        token: generarJWT(usuario._id) 
        })
    }else{
        const error= new Error('Contraseña incorrecta')
        return res.status(403).json({msg: error.message})
    }

}

export{registrarUsuario,autenticarUsuario}