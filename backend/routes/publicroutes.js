const express = require('express');
const router = express.Router();

// Simulação de verificação da URL
router.post('/check-url', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'URL inválida' });
  }

  // Aqui você poderia colocar uma lógica real de verificação
  const fakeResult = {
    url,
    isPotentiallyFraudulent: false,
    status: 'Verificação básica concluída',
  };

  res.status(200).json(fakeResult);
});

module.exports = router;