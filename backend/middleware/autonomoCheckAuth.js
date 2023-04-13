import jwt from 'jsonwebtoken'
import Autonomo from '../models/Autonomo.js';

const autonomoCheckAuth = async (req,res,next)=>{
    // La autorizacon se hara mediante el JsonWebTokenError, que lo colocaremos en la url

    // Bearer es una convencion que se utiliza para enviar el token

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        try {
            //req.lheaders.authorization nos da el siguiente Bearer: nqsijnbwqsinbd
            // Nos interesa quedarnos con lo que viene despues del Bearer, despues, lo desodificaremos con jwt
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            // Creo la variable de autonomo, en la que pongo todos sus datos que se encuantran en la db menos el password
            req.autonomo = await Autonomo.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
        
            // Una vez lo tenemos  checkeado pasamos al siguiente middleware
            return next()
            
        } catch (error) {
            return res.status(404).json({msg:'Hubo un error'})
        }
    }

    // en caso de que el usuario no mande un token
    if (!token) {
        const error=new Error('Token no valido')
        res.status(401).json({msg:error.message})
    }
    next()
}

export default autonomoCheckAuth