exports.estimateTax = (req, res) => {
  const { productValue, shippingCost, category } = req.body;

  if (!productValue || !shippingCost || !category) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: productValue, shippingCost e category.' });
  }

  // Exemplo de cálculo de imposto padrão
  let taxRate = 0.6; // 60% padrão
  if (category === 'roupas') taxRate = 0.35;
  if (category === 'livros') taxRate = 0; // isento

  const estimatedTax = (productValue + shippingCost) * taxRate;
  const totalCost = productValue + shippingCost + estimatedTax;

  res.json({
    productValue,
    shippingCost,
    estimatedTax: parseFloat(estimatedTax.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    notes: 'Este cálculo é uma estimativa. Impostos reais podem variar.'
  });
};
