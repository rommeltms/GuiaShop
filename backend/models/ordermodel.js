const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  trackingCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Aguardando atualização',
  },
  history: [
    {
      date: String,
      location: String,
      status: String,
    },
  ],
  isAffiliated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
