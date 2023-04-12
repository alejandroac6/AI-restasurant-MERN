import {
    categoriaTasks,
    nuevaTask,
    obtenerTask,
    editarTask,
    eliminarTask,
    solicitarTask,
    aceptarTask,
    declinarTask,
    autonomoTasks,
    usuarioTasks,
} from '../controllers/taskController.js'

// todo lo que tenga relacion con tasks tanto el usuario como el autonomo debe estar autenticado
import express from 'express'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.get('/',checkAuth,obtenerTask);



export default router