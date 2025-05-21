'use client';
import { useState } from 'react';

export default function Calculadora() {
  const [productValue, setProductValue] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [category, setCategory] = useState('padrao');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setResultado(null);

    try {
      const response = await fetch('http://localhost:3001/api/calculator/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productValue: parseFloat(productValue),
          shippingCost: parseFloat(shippingCost),
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      setErro('Erro ao calcular. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calculadora de Impostos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Valor do Produto:</label>
          <input
            type="number"
            value={productValue}
            onChange={(e) => setProductValue(e.target.value)}
            className="w-full border p-2 rounded"
            required
            step="0.01"
            min="0"
          />
        </div>
        <div>
          <label>Custo do Frete:</label>
          <input
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            className="w-full border p-2 rounded"
            required
            step="0.01"
            min="0"
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="padrao">Padrão (60%)</option>
            <option value="roupas">Roupas (35%)</option>
            <option value="livros">Livros (isento)</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Calcular
        </button>
      </form>

      {erro && <p className="text-red-600 mt-4">{erro}</p>}

      {resultado && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>Valor do Produto: R$ {resultado.productValue}</p>
          <p>Custo do Frete: R$ {resultado.shippingCost}</p>
          <p>Imposto Estimado: R$ {resultado.estimatedTax}</p>
          <p>Total Estimado: R$ {resultado.totalCost}</p>
          <p className="text-xs text-gray-500">{resultado.notes}</p>
        </div>
      )}
    </div>
  );
}
