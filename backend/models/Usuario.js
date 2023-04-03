import mongoose from "mongoose";

const usuarioSchema=mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token:{
        type: String,
    },
    
    confirmado:{
        type: Boolean,
        default: false,

    },   
},
{
    // para crear 2 columnas mas, la de tiempo de creacion y la del tiempo de actualizacion
    timestamps:true,
})

const Usuario=mongoose.model("Usuario",usuarioSchema);
export default Usuario;