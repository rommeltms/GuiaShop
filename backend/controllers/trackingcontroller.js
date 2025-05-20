// controllers/tracking.controller.js
const axios = require('axios');

// Simulação de rastreio público básico
exports.publicTrack = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ message: 'Código de rastreio obrigatório.' });

  try {
    // Substituir por integração real futuramente
    const fakeResult = {
      code,
      status: 'Em trânsito',
      lastUpdate: '2025-04-29T15:12:00Z',
      location: 'Curitiba/PR',
    };

    res.json(fakeResult);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar rastreio.' });
  }
};

// Rastreamento completo (usuários logados, compras da plataforma)
exports.authTrack = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ message: 'Código de rastreio obrigatório.' });

  try {
    // Aqui futuramente: checar se pertence ao usuário (banco de dados)
    const result = {
      code,
      status: 'Objeto entregue',
      history: [
        { date: '2025-04-27', location: 'São Paulo/SP', status: 'Saiu para entrega' },
        { date: '2025-04-28', location: 'São Paulo/SP', status: 'Entregue' },
      ],
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro no rastreamento autenticado.' });
  }
};