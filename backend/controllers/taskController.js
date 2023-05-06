import Task from "../models/Task.js";

// funcion que se encarga de listar todas las tareas de una categoria
const categoriaTasks = async (req, res) => {};

// Genera un calendario con los huecos ocupados o disponibles del autonomo
const disponibilidadTask = async (req, res) => {
  const { autonomo } = req;
  return res.json(autonomo.franjas_disponibles);
};

// Cuando el autonomo crea una nueva tarea
const nuevaTask = async (req, res) => {
  const { nombre, descripcion, categoria, fechaServicio, duracionServicio } =
    req.body;

  const { autonomo } = req;

  try {
    const nuevaTarea = new Task({
      nombre,
      descripcion,
      categoria,
      fechaServicio,
      duracionServicio,
      creador: autonomo,
    });

    const tareaAlmacenada = await nuevaTarea.save();
    return res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

// cuando clicas en la tarea el desplegable con toda la info
const obtenerTask = async (req, res) => {
  const { id } = req.params;
  const ExisteTarea = await Task.findOne({ _id: id });

  if (!ExisteTarea) {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }

  return res.json(ExisteTarea);
};

// cuando el autonomo tras colgar la tarea pueda editar algunos campos
const editarTask = async (req, res) => {
  //comprobamos si la tarea existe
  const { nombre, descripcion, categoria, fechaServicio, duracionServicio } =
    req.body;

  const { id } = req.params;
  const ExisteTarea = await Task.findOne({ _id: id });
  const { creador } = ExisteTarea;
  const { autonomo } = req;

  // Miramos si el autonomo que crea la tarea es el que la quiere editar o eliminar

  if (autonomo._id.toString() !== creador.toString()) {
    const error = new Error("No tienes los permisos para realizar esa accion");
    return res.status(404).json({ msg: error.message });
  }

  if (ExisteTarea) {
    ExisteTarea.nombre = nombre || ExisteTarea.nombre;
    ExisteTarea.descripcion = descripcion || ExisteTarea.descripcion;
    ExisteTarea.fechaServicio = fechaServicio || ExisteTarea.fechaServicio;
    ExisteTarea.duracionServicio =
      duracionServicio || ExisteTarea.duracionServicio;

    try {
      await ExisteTarea.save();
      res.json({ msg: "Tarea editada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }
};

// cuando el autonomo elimina la tarea
const eliminarTask = async (req, res) => {
  const { id } = req.params;

  //comprobamos que la tarea exista
  const tarea = await Task.findOne({ _id: id });

  const { creador } = tarea;
  const { autonomo } = req;

  // Miramos si el autonomo que crea la tarea es el que la quiere editar o eliminar

  if (autonomo._id.toString() !== creador.toString()) {
    const error = new Error("No tienes los permisos para realizar esa accion");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea) {
    try {
      await tarea.deleteOne({ _id: id });
      res.json({ msg: "Tarea eliminada" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }
};

// cuando el usuario solicita el servicio, asigna un usuario a la tarea
const solicitarTask = async (req, res) => {
  console.log("desde solicitar task");
  const { usuario } = req;
  console.log(usuario);

  const { id } = req.params;
  const tarea = await Task.findById(id);

  console.log(tarea);

  if (tarea) {
    console.log("desde tarea creada");
    tarea.cliente = usuario._id;
    try {
      await tarea.save();
      res.json({
        msg: "Tarea solicitada correctamente, recibirá un email de confirmacion una vez su autonomo haya confirmado la reserva",
      });
    } catch (error) {
      console.log(tarea);
    }
    await tarea.save();
  } else {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }
};

//cuando el usuario cancela un servicio, quitar el usuario de la tarea
const cancelarTask = async (req, res) => {
  const { id } = req.params;

  //comprobamos que la tarea exista
  console.log(id);
  const tarea = await Task.findOne({ _id: id });

  const { usuario } = req;
  const { cliente } = tarea;

  if (usuario._id.toString() !== cliente.toString()) {
    const error = new Error("No tienes los permisos para realizar esa accion");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea) {
    try {
      tarea.cliente = null;
      await tarea.save();
      res.json({ msg: "Tarea cancelada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }
};

//cuando el Autonomo acepta la tarea asignada
const aceptarTask = async (req, res) => {
  const { id } = req.params;

  //comprobamos que la tarea exista
  const tarea = await Task.findOne({ _id: id });

  const { autonomo } = req;
  const { creador } = tarea;

  // Miramos si el autonomo que crea la tarea es el que la quiere editar o eliminar

  if (autonomo._id.toString() !== creador.toString()) {
    const error = new Error("No tienes los permisos para realizar esa accion");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea) {
    try {
      tarea.confirmada = true;
      await tarea.save();
      res.json({ msg: "Tarea confirmada" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }
};

//cuando el Autonomo declina la tarea asignada
const declinarTask = async (req, res) => {
  const { id } = req.params;

  //comprobamos que la tarea exista
  const tarea = await Task.findOne({ _id: id });

  const { autonomo } = req;
  const { creador } = tarea;

  // Miramos si el autonomo que crea la tarea es el que la quiere editar o eliminar

  if (autonomo._id.toString() !== creador.toString()) {
    const error = new Error("No tienes los permisos para realizar esa accion");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea) {
    try {
      await tarea.deleteOne({ _id: id });
      res.json({ msg: "Tarea declinada" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Tarea no existente");
    return res.status(404).json({ msg: error.message });
  }
};

//lista de todas las proximas tareas que tiene el autonomo
const autonomoTasks = async (req, res) => {
  const { autonomo } = req;

  //Consultar en la base de datos todas las tareas que tiene que hacer un autonomo

  const tasks = await Task.find({ creador: autonomo.id });
  return res.json(tasks);
};

//lista de todas las proximas citas que tiene el usuario
const usuarioTasks = async (req, res) => {
  const { usuario } = req;

  const Tareas = await Task.find({ cliente: usuario.id });

  if (Tareas) {
    return res.json(Tareas);
  } else {
    return res.json({ msg: "Solicita tareas" });
  }
};

export {
  categoriaTasks,
  disponibilidadTask,
  nuevaTask,
  obtenerTask,
  editarTask,
  solicitarTask,
  cancelarTask,
  aceptarTask,
  declinarTask,
  autonomoTasks,
  usuarioTasks,
  eliminarTask,
};
