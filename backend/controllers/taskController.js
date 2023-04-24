import Task from "../models/Task.js"

// funcion que se encarga de listar todas las tareas de una categoria
const categoriaTasks = async (req,res) =>{

}

// Genera un calendario con los huecos ocupados o disponibles del autonomo
const disponibilidadTask =  async (req,res)=>{
    const {autonomo}=req
    return res.json(autonomo.franjas_disponibles)

}

// Cuando el autonomo crea una nueva tarea
const nuevaTask =  async (req,res)=>{
    const {nombre,descripcion,categoria,fechaServicio,duracionServicio}=req.body

    const {autonomo}=req

    try {
        const nuevaTarea= new Task({nombre,descripcion,categoria,fechaServicio,duracionServicio,creador:autonomo})

        const tareaAlmacenada=await nuevaTarea.save()

        return res.json(tareaAlmacenada)
        
    } catch (error) {
        console.log(error)
        
    }



}

// cuando clicas en la tarea el desplegable con toda la info
const obtenerTask = async (req,res)=>{
    const {id}=req.params
    const ExisteTarea= await Task.findOne({_id:id});

    if (!ExisteTarea){
        const error = new Error('Tarea no existente')
        return res.status(404).json({msg:error.message})
    }

    return res.json(ExisteTarea)
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

    const {autonomo}=req

    //Consultar en la base de datos todas las tareas que tiene que hacer un autonomo

    const tasks=await Task.find({creador:autonomo.id})
    return res.json(tasks)



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



