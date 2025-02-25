const express = require('express');
const env = require('dotenv');

env.config({path: './env/.env'});
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.render('index.html');
})

const puerto = process.env.PORT || 3000;

app.listen(puerto, ()=>{
    console.log(`El servidor local es: http://localhost:${puerto}`);
})