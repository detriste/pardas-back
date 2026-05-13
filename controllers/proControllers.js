const db = require('../banco');

exports.listarProdutos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos ORDER BY id ASC');
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.cadastrarProduto = async (req, res) => {
  try {
    const { nomepro, desc, preco, quantidade, quantidade_minima } = req.body;
    if (!nomepro || !desc || !preco || !quantidade || !quantidade_minima)
      return res.status(400).json({ erro: 'Preencha todos os campos' });

    await db.query(
      'INSERT INTO produtos (nomepro, `desc`, preco, quantidade, quantidade_minima) VALUES (?, ?, ?, ?, ?)',
      [nomepro, desc, preco, quantidade, quantidade_minima]
    );
    
    return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.editarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomepro, desc, preco, quantidade, quantidade_minima } = req.body;
    if (!nomepro || !desc || !preco || !quantidade || !quantidade_minima)
      return res.status(400).json({ erro: 'Preencha todos os campos' });

    await db.query(
      'UPDATE produtos SET nomepro=?, `desc`=?, preco=?, quantidade=?, quantidade_minima=? WHERE id=?',
      [nomepro, desc, preco, quantidade, quantidade_minima, id]
    );

    return res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.excluirProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query('SELECT id FROM produtos WHERE id = ?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ erro: 'Produto não encontrado' });

    await db.query('DELETE FROM produtos WHERE id = ?', [id]);

    return res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};