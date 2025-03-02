const {validateToken} = require('../utils/token.js');
const {registrarAsistencia} = require('../config/google.js');

exports.registrar = async(req, res) => {
    const {curso, nombre, token} = req.body;

    if(!validateToken){
        return res.status(400).json({ error: 'Token inválido o expirado'});
    }
    // console.log(`Curso: ${curso}\nNombre: ${nombre}\nToken: ${token}`);
    await registrarAsistencia(curso, nombre, token);
    res.json({message: 'Asistencia registrada con exito!'}); 
};