const express = require('express');
const env = require('dotenv');
const apiRoutes = require('../src/routes/api.js');

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
    res.render('index.html');
})

app.listen(puerto, ()=>{
    console.log(`El servidor local es: http://localhost:${puerto}`);
})