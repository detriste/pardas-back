const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControllers');


router.post('/usuarios', usuarioController.cadastrarUsuario); // post para criar usuario

module.exports = router;