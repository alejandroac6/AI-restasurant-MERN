import {
    categoriaTasks,
    disponibilidadTask,
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
import autonomoCheckAuth from '../middleware/autonomoCheckAuth.js'

const router = express.Router()

router.get('/',checkAuth,obtenerTask);
router
    .route('/crearTarea')
    .get(autonomoCheckAuth,disponibilidadTask)
    .post(autonomoCheckAuth,nuevaTask)






export default router