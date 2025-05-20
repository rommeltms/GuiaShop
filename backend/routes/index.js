const express = require('express');
const router = express.Router();

// Rotas de autenticação
const authRoutes = require('./auth/auth.routes');

// Rotas de usuário (perfil, dados, histórico, etc.)
const userRoutes = require('./userroutes');

// Rotas de rastreamento e URL (em breve)
const trackingRoutes = require('./trackingroutes');
const urlRoutes = require('./urlroutes');

// Outras rotas públicas
const publicRoutes = require('./public.routes');

// Aplicando as rotas
router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/tracking', trackingRoutes);
router.use('/api/url', urlRoutes);
router.use('/', publicRoutes);
router.use('/orders', require('./order.routes'));

module.exports = router;