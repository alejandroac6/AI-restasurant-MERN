import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

usuarioSchema.pre('save',async function(next){
    // cuando estemos editando el perfil, en caso de que no se este modificando el password, que no haga nada, que vaya al siguiente middleware, por eso suamos next

    if(!this.isModified('password')){
        next()
    }
    // hacemos operaciones en el servidor y lo aplicara en el salt, tema hasheo por rondas
    const salt = await bcrypt.genSalt(10);

    // utilizamos function() porque necesitaremos acceder a this.
    this.password= await bcrypt.hash(this.password,salt);

})

const Usuario=mongoose.model("Usuario",usuarioSchema);
export default Usuario;