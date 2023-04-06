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

const confirmarCuenta= async(req,res)=>{
    // Extraemos el token de los params de la ruta dinamica
    const {token}= req.params

    // Detectamos si hay alguno que tenga ese token y que visite la pagina de confirmar cuenta
    const usuarioConfirmar=await Usuario.findOne({token})
    console.log(usuarioConfirmar)

    // Si existe el usuario le confirmamos la confirmarCuenta, si no existe enviamos un error

    if (!usuarioConfirmar) {
        const error = new Error('Usuario no existente')
        return res.status(404).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado=true;
        usuarioConfirmar.token="";
        
        await usuarioConfirmar.save();
        res.json({msg: 'Usuario Confirmado Correctamente'})

    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async(req,res)=>{
    const {email}=req.body;

    console.log(email)

     // comprobar si el usuario existe
     const usuario= await Usuario.findOne({email})
     console.log(usuario)

     if (!usuario) {
         const error= new Error('El Usuario no existe')
         return res.status(404).json({msg: error.message})
     }

     try {
        usuario.token=generarId()
        await usuario.save()
        res.json({msg:'Hemos enviado un email a tu cuenta de correo con las instrucciones'})
        
     } catch (error) {
        console.log(error)
     }
}

const comprobarToken=async(req,res)=>{
    const {token}=req.params;
    // Compruebo si esta en la db
    const tokenvalido=await Usuario.findOne({token});

    if (tokenvalido) {
        res.json({msg:"Token valido"})
    }else{
        const error = new Error('Token no válido')
        return res.status(404).json({msg: error.message})
    }

}

const nuevoPassword=async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;

    // Comprobar que es un token valido
    const usuario=await Usuario.findOne({token});

    if (usuario) {
        usuario.password=password;
        usuario.token=''

        try {
            await usuario.save()
            res.json({msg: "Password reseteado correctamente"}) 
        } catch (error) {
            console.log(error)
        }
    }else{
        const error = new Error('Token no válido')
        return res.status(404).json({msg: error.message})
    }
}

const perfilUsuario =async (req,res)=>{
    // Aqui ya hemos cargado en el servidor el usuario al autenticalro
    const {usuario}=req
    console.log(usuario)
    
}

export{
    registrarUsuario,
    autenticarUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfilUsuario
}