// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes'); // <-- IMPORTANTE

app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes); // <-- ATENÇÃO AQUI

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Guiashop rodando na porta ${PORT}`);
});
