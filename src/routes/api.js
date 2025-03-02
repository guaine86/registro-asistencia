const express = require('express');
const {generateToken} = require('../utils/token.js');
const {registrar} = require('../controllers/asistencia.js');

const router = express.Router();

router.get('/token', (req, res) => {
    const token = generateToken();
    // console.log(token);
    res.json({token});
});

router.post('/registrar', registrar);

module.exports = router;