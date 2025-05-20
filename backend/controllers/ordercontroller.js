const { sendEmail } = require('../utils/emailSender');
const User = require('../models/user.model'); // se ainda não tiver importado

exports.registerOrder = async (req, res) => {
  const { url, trackingCode, isAffiliated } = req.body;

  if (!url || !trackingCode) {
    return res.status(400).json({ message: 'URL e código de rastreio são obrigatórios.' });
  }

  try {
    const newOrder = await Order.create({
      user: req.user._id,
      url,
      trackingCode,
      isAffiliated: !!isAffiliated,
    });

    if (isAffiliated) {
      const user = await User.findById(req.user._id);

      await sendEmail({
        to: user.email,
        subject: '🎉 Pedido registrado com sucesso!',
        text: `Sua compra com código ${trackingCode} foi registrada. Você receberá atualizações por e-mail.`,
        html: `<p>Olá <b>${user.name}</b>,</p><p>Sua compra <i>${trackingCode}</i> foi registrada com sucesso em nossa plataforma.</p><p>Você receberá notificações automáticas do status de rastreio.</p>`,
      });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar pedido.' });
  }
};
