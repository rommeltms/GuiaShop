exports.estimateTax = (req, res) => {
  const { productValue, shippingCost, category } = req.body;

  if (
    typeof productValue !== 'number' ||
    typeof shippingCost !== 'number' ||
    typeof category !== 'string'
  ) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  const taxRates = {
    livros: 0,
    roupas: 0.35,
    eletronicos: 0.6,
    suplementos: 0.2,
    outros: 0.5,
  };

  const categoryKey = category.toLowerCase();
  const taxRate = taxRates[categoryKey];

  if (taxRate === undefined) {
    return res.status(400).json({ error: 'Categoria inválida.' });
  }

  const estimatedTax = (productValue + shippingCost) * taxRate;
  const totalCost = productValue + shippingCost + estimatedTax;

  res.json({
    productValue,
    shippingCost,
    estimatedTax: parseFloat(estimatedTax.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    notes: 'Este cálculo é uma estimativa. Impostos reais podem variar.',
  });
};
