// controllers/urlController.js

const getUrls = (req, res) => {
  res.status(200).json({ message: 'Rota GET de URLs funcionando!' });
};

const createUrl = (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'URL original é obrigatória.' });
  }

  const shortUrl = Math.random().toString(36).substring(7);

  res.status(201).json({
    originalUrl,
    shortUrl: `https://guiashop.com/${shortUrl}`,
  });
};

module.exports = { getUrls, createUrl };
