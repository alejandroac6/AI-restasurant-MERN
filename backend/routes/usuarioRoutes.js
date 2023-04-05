import express from "express"
const router=express.Router();
import {registrarUsuario} from "../controllers/usuarioController.js";

// Autenticacion, Registro y Confirmacion de Usuarios

router.post('/',registrarUsuario);


export default router