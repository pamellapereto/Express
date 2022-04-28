/* 

Estrutura de backend, em que iremos selecionar, cadastrar, atualizar e
deletar dados sobre os clientes, ou seja, criaremos um crud

CRUD
C -> Create: Quando cria-se dados no banco
R -> Read: Quando lemos dados no banco
U -> Update: Quando atualizamos dados no banco
D -> Delete: Quando apagamos dados no banco


Vamos udar os verbos: GET, POST, PUT, DELETE, onde:

GET -> Read
POST -> Create
PUT -> Update
DELETE -> Delete

*/

//Importação do módulo express
const express = require("express");

//Importação do módulo do Mongoose
const mongoose = require("mongoose");

//Criação do app referente ao express
const app = express();

//Preparar o servidor para receber json
app.use(express.json());

/*

Caminho do banco de dados mongodb
mongodb+srv://pamellapereto:Notade100@clustercliente.dqmxy.mongodb.net/bancodedados?retryWrites=true&w=majority

*/

const urldb =
  "mongodb+srv://pamellapereto:Notade100@clustercliente.dqmxy.mongodb.net/bancodedados?retryWrites=true&w=majority";
mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true });

/*Definição do esquema de dados da tabela Schema*/
const tabela = mongoose.Schema({
  nome: { type: String, require },
  email: { type: String, require },
  telefone: { type: String },
  cidades: { type: String },
});

const Cliente = mongoose.model("tbcliente", tabela);

//Definição de uma rota padrão
const default_rote = "/api/cliente";

//Rota para listar os clientes com endpoint listar
app.get(`${default_rote}/listar`, (req, res) => {
  res.status(200).send({ output: `Rota GET` });
});

//Rota para cadastrar os clientes com endpoint cadastrar
app.post(`${default_rote}/cadastrar`, (req, res) => {
  const cli = new Cliente(req.body);
  cli
    .save()
    .then((dados) => {
      res
        .status(201)
        .send({ output: "Dados cadastrados com sucesso", payload: dados });
    })
    .catch((erro) => console.error(`Erro ao tentar cadastrar ${erro}`));
});

//Rota para atualizar os clientes com endpoint atualizar
//Passagem de argumentos pela url com o id do cliente
app.put(`${default_rote}/atualizar/:id`, (req, res) => {
  res.status(200).send({ output: req.params.id });
});

//Rota para apagar cliente com endpoint deletar
app.delete(`${default_rote}/apagar/:id`, (req, res) => {
  res.status(204).send({ output: req.params.id });
});

app.listen(5000, () =>
  console.log("Servidor on-line em: http://localhost:5000")
);
