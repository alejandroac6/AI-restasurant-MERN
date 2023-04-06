import express from "express"
const router=express.Router();
import {registrarUsuario,autenticarUsuario,confirmarCuenta,olvidePassword,comprobarToken} from "../controllers/usuarioController.js";

// Autenticacion, Registro y Confirmacion de Usuarios

router.post('/',registrarUsuario);
router.post('/login',autenticarUsuario)
router.get('/confirmar/:token',confirmarCuenta)
router.post('/olvide-password',olvidePassword)
router.post('/olvide-password/:token',comprobarToken)


export default router