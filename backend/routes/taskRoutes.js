import {
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
} from "../controllers/taskController.js";

// todo lo que tenga relacion con tasks tanto el usuario como el autonomo debe estar autenticado
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import autonomoCheckAuth from "../middleware/autonomoCheckAuth.js";

const router = express.Router();

router.get("/", checkAuth, usuarioTasks);

router
  .route("/:id")
  .get(checkAuth,obtenerTask)
  .post(checkAuth,solicitarTask)
  .put(checkAuth,cancelarTask);

// Estas son las rutas que utilizaran los autonomos para gestionar las tareas
router
  .route("/crearTarea")
  .get(autonomoCheckAuth, disponibilidadTask)
  .post(autonomoCheckAuth, nuevaTask);

router.get("/gestionarTareas", autonomoCheckAuth, autonomoTasks);

router
  .route("/gestionarTareas/:id")
  .get(autonomoCheckAuth, obtenerTask)
  .post(autonomoCheckAuth, aceptarTask)
  .delete(autonomoCheckAuth, declinarTask);

router
  .route("/gestionarTareas/EditarTarea/:id")
  .put(autonomoCheckAuth, editarTask)
  .delete(autonomoCheckAuth, eliminarTask);

export default router;
