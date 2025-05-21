const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/calculator/estimate', (req, res) => {
  const { productValue, shippingCost, category } = req.body;

  if (typeof productValue !== 'number' || typeof shippingCost !== 'number' || !category) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  let taxRate = 0.6; // padrão 60%

  switch (category.toLowerCase()) {
    case 'eletronicos':
      taxRate = 0.8;
      break;
    case 'livros':
      taxRate = 0.0;
      break;
    case 'roupas':
      taxRate = 0.35;
      break;
    case 'padrao':
    default:
      taxRate = 0.6;
      break;
  }

  const estimatedTax = (productValue + shippingCost) * taxRate;
  const totalCost = productValue + shippingCost + estimatedTax;

  res.json({
    productValue,
    shippingCost,
    estimatedTax,
    totalCost,
    notes: 'Este cálculo é uma estimativa. Impostos reais podem variar.'
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

