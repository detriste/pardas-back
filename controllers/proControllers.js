const bcrypt = require('bcrypt');
const db = require('../banco');

exports.cadastrarProduto = async (req, res) => {
  try {
    const {  } = req.body;

    // Validação
    if (!nomepro || !desc || !preco|| !quantidade || !quantidade_minima) {
      return res.status(400).json({ erro: 'Preencha todos os campos' });
    }



    // Insere no banco
    await db.query(
      'INSERT INTO produtos (nome, descricao, preco, quantidade, quantidade_minima) VALUES (?, ?, ?, ?, ?)',
      [nomepro, desc, preco, quantidade, quantidade_minima]
    );

    return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};