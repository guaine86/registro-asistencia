const express = require('express');
const env = require('dotenv');
const path = require('path');
const apiRoutes = require('../src/routes/api.js');
const {generateToken} = require('../src/utils/token.js');

// env.config({path: './.env'});
env.config();
const app = express();
const puerto = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
// Rutas
app.use('/api', apiRoutes);

app.get('/', (req,res) =>{
    const token = generateToken();
    // res.send(token);
    res.redirect(`/formulario/${token}`);
    // res.render('index.html');
})

app.get('/formulario/:token', (req, res) => {
    // const muestra = req.params;
    // res.send(muestra)
    res.sendFile(path.join(__dirname,'../index.html'));
});

app.listen(puerto, ()=>{
    console.log(`El servidor local es: http://localhost:${puerto}`);
})