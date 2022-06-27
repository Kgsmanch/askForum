const express = require ("express");
const app = express ();
const port = 3000;
const bodyParser = require("body-parser");
const conn = require("./database/db")
const formAskModel = require('./database/FormAsk');
const { text } = require("body-parser");
const answerModel = require('./database/Answers');
const { response } = require("express");

// DECODIFICA OS DADOS ENVIADOS PELO FORMULARIO PARA LINGUAGEM JS
app.use(bodyParser.urlencoded({extended:false}));
// habilita receber dados via json
app.use(bodyParser.json());

// METHODO EXPRESS PARA MUDAR A VIEW ENGINE PARA EJS
app.set('view engine', 'ejs');
app.use (express.static('public'));

require('dotenv').config()

app.get('/', (request, result) => {
    formAskModel.findAll({raw:true, order:[['id','DESC']]}).then (showAll => {
    //  console.log(showAll);
      result.render("index", {
        showAll:showAll,
      });
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

app.get("/questions/:id", (request, result) =>{
  let id = request.params.id;
  formAskModel.findOne({
    where:{id: id}
  }).then(questions => {
    if(questions != undefined) {

      answerModel.findAll({
        where: {questionId:id},
        order: [
          ['id', 'DESC']
        ]
      }).then(showAnswers => {
        result.render("questions", {
          questions:questions,
          showAnswers:showAnswers
        })
      })
    } else{
      result.redirect("/");
    }
  });
});

app.post("/questions", (request, result) => {
  let bodyText = request.body.bodyText;
  let answerId = request.body.answerId;

  answerModel.create({
    bodyAnswer:bodyText,
    questionId:answerId,
  })
  .then(() => {
    result.redirect("/questions/"+answerId);
  })
})

app.listen (port, (function (erro) {
    if (erro) {
        console.log (`Erro ao conectar`)
    } else {
        console.log (`Conectado em: http://localhost:${port}/`);
    }
}))

