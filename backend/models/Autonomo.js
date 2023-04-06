import mongoose from "mongoose";
import bcrypt from "bcrypt"

const AutonomoSchema=mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },

    // Hace falta crear el modelo de profesiones

    profesion:{
        type: String,
        required: true,       
    },
    
    ref_autonomo:{
        type: String,
        required: true,
        trim: true,
    },

    franjas_disponibles:[{
        type: Date,
    }],

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

AutonomoSchema.pre('save',async function(next){
    // cuando estemos editando el perfil, en caso de que no se este modificando el password, que no haga nada, que vaya al siguiente middleware, por eso suamos next

    if(!this.isModified('password')){
        next()
    }
    // hacemos operaciones en el servidor y lo aplicara en el salt, tema hasheo por rondas
    const salt = await bcrypt.genSalt(10);

    // utilizamos function() porque necesitaremos acceder a this.
    this.password= await bcrypt.hash(this.password,salt);

})

AutonomoSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario,this.password);
}

const Autonomo=mongoose.model("Autonomo",AutonomoSchema);
export default Autonomo;