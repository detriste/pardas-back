const express = require('express');
const app = express();

const usuarioRotas = require('./rotas/usuarioRota');

app.use(express.json());


app.use(usuarioRotas);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});