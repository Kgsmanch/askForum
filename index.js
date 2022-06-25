const express = require ("express");
const app = express ();
const port = 3000;
const bodyParser = require("body-parser");
const conn = require("./database/db")
const formAskModel = require('./database/FormAsk');
const { text } = require("body-parser");

// DECODIFICA OS DADOS ENVIADOS PELO FORMULARIO PARA LINGUAGEM JS
app.use(bodyParser.urlencoded({extended:false}));
// habilita receber dados via json
app.use(bodyParser.json());

// METHODO EXPRESS PARA MUDAR A VIEW ENGINE PARA EJS
app.set('view engine', 'ejs');
app.use (express.static ('public'));
require('dotenv').config()

app.get('/', (request, result) => {
    formAskModel.findAll({raw:true}).then (showAll => {
      result.send(`<h2>${showAll}</h2>`)
    });
  });

app.get('/FormAsk', function (request, result) {
    result.render('FormAsk');
  });

// // formAsk rota POST receber os dados do form e salva em variaveis
app.post('/saveAsk', (request, result) =>{
  let titleAsk = request.body.titleAsk;
  let textAsk = request.body.textAsk;
  formAskModel.create({
      title: titleAsk,
      description: textAsk
// caso aconteça redireciona para diretorio raiz
    }).then(() => {
        result.redirect("/");
  })
});
  

app.listen (port, (function (erro) {
    if (erro) {
        console.log (`Erro ao conectar`)
    } else {
        console.log (`Conectado em: http://localhost:${port}/`);
    }
}))

