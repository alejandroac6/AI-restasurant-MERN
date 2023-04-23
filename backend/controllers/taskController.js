import Task from "../models/Task.js"

// funcion que se encarga de listar todas las tareas de una categoria
const categoriaTasks = async (req,res) =>{

}

// Genera un calendario con los huecos ocupados o disponibles del autonomo
const disponibilidadTask =  async (req,res)=>{

}

// Cuando el autonomo crea una nueva tarea
const nuevaTask =  async (req,res)=>{
    const {nombre,descripcion,categoria,fechaServicio,duracionServicio}=req.body

    const {autonomo}=req

    try {
        const nuevaTarea= new Task({nombre,descripcion,categoria,fechaServicio,duracionServicio,creador:autonomo})

        const tareaAlmacenada=await nuevaTarea.save()

        res.json(tareaAlmacenada)
        
    } catch (error) {
        console.log(error)
        
    }

    


}

// cuando clicas en la tarea el desplegable con toda la info
const obtenerTask = async (req,res)=>{

}

// cuando el autonomo tras colgar la tarea pueda editar algunos campos
const editarTask=async (req,res)=>{

}

// cuando el autonomo elimina la tarea
const cancelarTask=async (req,res)=>{

}

// cuando el usuario selecciona franja horaria y solicita el servicio
const solicitarTask =async (req,res)=>{

}

//cuando el Autonomo acepta la tarea asignada
const aceptarTask=async (req,res)=>{

}

//cuando el Autonomo declina la tarea asignada
const declinarTask=async (req,res)=>{

}

//lista de todas las proximas tareas que tiene el autonomo
const autonomoTasks = async (req,res)=>{

}

//lista de todas las proximas citas que tiene el usuario
const usuarioTasks = async (req,res)=>{

    console.log('desde nueva task')
    console.log(req.body)

}

export{
    categoriaTasks,
    disponibilidadTask,
    nuevaTask,
    obtenerTask,
    editarTask,
    cancelarTask,
    solicitarTask,
    aceptarTask,
    declinarTask,
    autonomoTasks,
    usuarioTasks,
}



