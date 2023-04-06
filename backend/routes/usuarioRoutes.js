import express from "express"
const router=express.Router();

import {registrarUsuario,
    autenticarUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfilUsuario
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticacion, Registro y Confirmacion de Usuarios

router.post('/',registrarUsuario);
router.post('/login',autenticarUsuario)
router.get('/confirmar/:token',confirmarCuenta)
router.post('/olvide-password',olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

router.get('/perfil',checkAuth,perfilUsuario)

export default router