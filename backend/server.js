const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('API do Guiashop funcionando 🚀');
});

// Porta de escuta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

