const bcrypt = require('bcrypt');
const db = require('../banco');

exports.cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validação
    if (!senha || !email || !nome) {
      return res.status(400).json({ erro: 'Preencha todos os campos' });
    }



    // Insere no banco
    await db.query(
      'INSERT INTO usuarios (senha, email, nome) VALUES (?, ?, ?)',
      [senhaHash, email, nome]
    );

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};