import express from "express"
const router=express.Router();
import {registrarUsuario,
    autenticarUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword
} from "../controllers/usuarioController.js";

// Autenticacion, Registro y Confirmacion de Usuarios

router.post('/',registrarUsuario);
router.post('/login',autenticarUsuario)
router.get('/confirmar/:token',confirmarCuenta)
router.post('/olvide-password',olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

export default router