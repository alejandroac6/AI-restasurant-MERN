import Usuario from "../models/Usuario.js";


const registrarUsuario = async(req,res)=>{
    try {
        // crea un nuevo usuario
        const usuario=new Usuario(req.body)

        // lo insertamos en la base de datos
        const usuarioAlmacenado= await usuario.save()
        
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
        
    }
    // {nombre,password,email}=req.body
    
};



export{registrarUsuario}