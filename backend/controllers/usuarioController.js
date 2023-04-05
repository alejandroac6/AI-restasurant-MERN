const usuarios = (req,res)=>{
    res.json({msg: "desde usuarios"})
};

const crearUsuario=(req,res)=>{
    res.json({msg:"creando usuario"})
}

export{usuarios,crearUsuario}