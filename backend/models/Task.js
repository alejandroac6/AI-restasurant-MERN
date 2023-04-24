import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
        
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },

    categoria:{
        type: String,
        required: true,
        trim: true,
    },

    fechaServicio:{
        type:Date,
        default: Date.now,
    },
    duracionServicio:{
        type: Number,
        required: true,
        default:30,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Autonomo',
        required:true,
    },

     cliente:{
         type:mongoose.Schema.Types.ObjectId,
         ref: "Usuario",
         default:null,
     }
},
{
        // para crear 2 columnas mas, la de tiempo de creacion y la del tiempo de actualizacion
        timestamps:true,

})

const Task=mongoose.model("Task",TaskSchema);

export default Task;