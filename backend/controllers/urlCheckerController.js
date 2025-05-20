const axios = require('axios');
const validUrl = require('valid-url');

// Função de verificação básica de URL
const checkUrl = async (req, res) => {
  const { url } = req.body;

  // Verificar se foi enviada uma URL
  if (!url) {
    return res.status(400).json({ error: 'URL não fornecida' });
  }

  // Validar o formato da URL
  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: 'URL inválida' });
  }

  try {
    // Tentar fazer uma requisição GET para a URL
    const response = await axios.get(url, { timeout: 5000 });

    // Exemplo simples: retornar status HTTP e headers
    res.status(200).json({
      status: response.status,
      headers: response.headers,
      message: 'Consulta feita com sucesso',
    });
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao consultar a URL',
      details: error.message,
    });
  }
};

module.exports = { checkUrl };