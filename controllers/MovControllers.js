const db = require('../banco');

// Lista todas as movimentações com nome do produto
exports.listarMovimentacoes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.id, m.tipo, m.quantidade, m.data_hora, p.nomepro AS produto
      FROM movimentações m
      JOIN produtos p ON p.movimentações_id = m.id
      ORDER BY m.id DESC
    `);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// Registra uma movimentação e atualiza o estoque do produto
exports.registrarMovimentacao = async (req, res) => {
  try {
    const { produto_id, tipo, quantidade } = req.body;

    if (!produto_id || !tipo || !quantidade)
      return res.status(400).json({ erro: 'Preencha todos os campos' });

    if (tipo !== 'Entrada' && tipo !== 'Saida')
      return res.status(400).json({ erro: 'Tipo deve ser Entrada ou Saida' });

    const qtd = parseInt(quantidade, 10);
    if (isNaN(qtd) || qtd <= 0)
      return res.status(400).json({ erro: 'Quantidade deve ser positiva' });

    // Verifica se o produto existe e pega estoque atual
    const [produtos] = await db.query('SELECT * FROM produtos WHERE id = ?', [produto_id]);
    if (produtos.length === 0)
      return res.status(404).json({ erro: 'Produto não encontrado' });

    const produto = produtos[0];

    // Verifica se tem estoque suficiente para Saída
    if (tipo === 'Saida' && produto.quantidade < qtd)
      return res.status(400).json({ erro: `Estoque insuficiente. Disponível: ${produto.quantidade}` });

    // Insere a movimentação
    const [movResult] = await db.query(
     'INSERT INTO movimentações (tipo, quantidade, data_hora) VALUES (?, ?, NOW())',
      [tipo, qtd]
    );

    // Atualiza o estoque do produto
    const novaQtd = tipo === 'Entrada'
      ? produto.quantidade + qtd
      : produto.quantidade - qtd;

    await db.query(
      'UPDATE produtos SET quantidade = ?, movimentações_id = ? WHERE id = ?',
      [novaQtd, movResult.insertId, produto_id]
    );

    return res.status(201).json({ mensagem: 'Movimentação registrada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};