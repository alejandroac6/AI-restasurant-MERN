import Usuario from "../models/Usuario.js";


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

        // lo insertamos en la base de datos
        const usuarioAlmacenado= await usuario.save()
        
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
        
    }
    // {nombre,password,email}=req.body
    
};



export{registrarUsuario}