import {
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
} from '../controllers/taskController.js'

// todo lo que tenga relacion con tasks tanto el usuario como el autonomo debe estar autenticado
import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import autonomoCheckAuth from '../middleware/autonomoCheckAuth.js'

const router = express.Router()

router.get('/',checkAuth,usuarioTasks);


router
    .route('/tasks/:id')
    .get(checkAuth,obtenerTask)
    .post(checkAuth,solicitarTask)
    .delete(checkAuth,cancelarTask)

// Estas son las rutas que utilizaran los autonomos para gestionar las tareas
router
    .route('/crearTarea')
    .get(autonomoCheckAuth,disponibilidadTask)
    .post(autonomoCheckAuth,nuevaTask)

router.get('/gestionarTareas',autonomoCheckAuth,autonomoTasks)

router
    .route('/gestionarTareas/:id')
    .get(autonomoCheckAuth,obtenerTask)
    .post(autonomoCheckAuth,aceptarTask)
    .delete(autonomoCheckAuth,declinarTask)

router.put('/gestionarTareas/EditarTarea/:id',autonomoCheckAuth,editarTask)

export default router