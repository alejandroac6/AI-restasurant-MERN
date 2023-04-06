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
    duracion_servicio:{
        type: Number,
        required: true,
    },
    autonomo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Autonomo',
        required:true,
    },
},
{
        // para crear 2 columnas mas, la de tiempo de creacion y la del tiempo de actualizacion
        timestamps:true,

})

const Task=mongoose.model("Task",TaskSchema);

export default Task;