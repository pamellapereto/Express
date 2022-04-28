//Importação do módulo do express

const express = require("express");

//Realizar a aplicação da função do express em uma variável de aplicativo
const app = express();

//get -> obter -> quando o usuário faz a chamada de uma url, por exemplo: http://www.uol.com.br
//post -> posta algum dado. Manda para o servidor alguma informação (por exemplo: cadastro de dados pessoais)
//put -> Atualizar. Quando usuário deseja realizar alguma atualização de dados. Por exemplo: trocar a senha
//delete -> Apagar. Quando deseja apagar algo no servidor

//Permitir com que o servidor receba dados no formato de JSON

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá!");
});

//Criação de uma lista de clientes
const clientes = [
  {
    id: 12,
    nome: "Helena",
    idade: 13,
  },

  {
    id: 13,
    nome: "Rafael",
    idade: 15,
  },
];

//Rota para clientes
app.get("/api/cliente/listar", (req, res) => {
  res.status(200).send({ output: clientes });
});

//Cadastrar novos clientes
app.post("/api/cliente/cadastrar", (req, res) => {
  clientes.push(req.body);
  res.status(201).send({ output: `Cliente cadastrado com sucesso!` });
});

app.listen(5000, () => console.log("http://localhost:5000"));
