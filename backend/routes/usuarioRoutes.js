import express from "express"
const router=express.Router();
import {registrarUsuario,autenticarUsuario} from "../controllers/usuarioController.js";

// Autenticacion, Registro y Confirmacion de Usuarios

router.post('/',registrarUsuario);
router.post('/login',autenticarUsuario)


export default router