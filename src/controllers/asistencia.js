const {validateToken} = require('../utils/token.js');
const {registrarAsistencia} = require('../config/google.js');

exports.registrar = async(req, res) => {
    const {curso, nombre, token} = req.body;

    if(!validateToken){
        return res.status(400).json({ error: 'Token inválido o expirado'});
    }

    await registrarAsistencia(curso, nombre);
    res.json({message: 'Asistencia registrada con exito!'}); 
};