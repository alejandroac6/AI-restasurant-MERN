import express from "express"
const router=express.Router();

import {registrarAutonomo,
    autenticarAutonomo,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfilAutonomo
} from "../controllers/autonomoController.js";

import autonomoCheckAuth from '../middleware/autonomoCheckAuth.js';

// Autenticacion, Registro y Confirmacion de Autonomos

router.post('/',registrarAutonomo);
router.post('/login',autenticarAutonomo)
router.get('/confirmar/:token',confirmarCuenta)
router.post('/olvide-password',olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

router.get('/perfil',autonomoCheckAuth,perfilAutonomo)

export default router