const express = require('express'); // tem que importar esses treco
const router = express.Router();
const proController = require('../controllers/proControllers'); // nome da função e oque ela faz 


router.post('/produtos', proController.cadastrarProduto); // post para criar produto ;; ela puxa aqui

module.exports = router;