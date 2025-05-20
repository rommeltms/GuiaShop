// controllers/user.controller.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.' });
  }
};