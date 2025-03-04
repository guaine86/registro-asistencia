const express = require('express');
const {generateToken} = require('../utils/token.js');
const {obtenerCursos} = require('../config/google.js');
const {registrar} = require('../controllers/asistencia.js');

const router = express.Router();

router.get('/token', (req, res) => {
    const token = generateToken();
    res.json({token});
});

router.get('/cursos', async(req, res)=>{
    try {
        const cursos = await obtenerCursos();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los cursos!'});
    }
});

router.post('/registrar', registrar);

module.exports = router;