const express = require('express');
const {generateToken} = require('../utils/token.js');
const {obtenerCursos, obtenerAlumnosPorCurso} = require('../config/google.js');
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

router.get('/alumnos/:curso', async(req,res)=>{
    try {
        const alumnos = await obtenerAlumnosPorCurso(req.params.curso);
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los alumnos!'});
    }
});

router.post('/registrar', registrar);

module.exports = router;