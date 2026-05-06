const express = require('express');
const router = express.Router();
const movController = require('../controllers/MovControllers');

router.get('/movimentacoes', movController.listarMovimentacoes);
router.post('/movimentacoes', movController.registrarMovimentacao);

module.exports = router;