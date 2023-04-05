import express from "express"
const router=express.Router();
import {usuarios,crearUsuario } from "../controllers/usuarioController.js";

// createConnection, Registro y Confirmacion de Usuarios

router.get('/',usuarios);
router.post('/',crearUsuario);

export default router