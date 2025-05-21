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
          category: category
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao conectar com o servidor');
      }

      const data = await response.json();
      setResultado(data);
    } catch (err) {
      setErro('Erro ao calcular. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Calculadora de Impostos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Valor do Produto:</label>
          <input type="number" value={productValue} onChange={e => setProductValue(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Custo do Frete:</label>
          <input type="number" value={shippingCost} onChange={e => setShippingCost(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoria:</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded">
            <option value="padrao">Padrão (60%)</option>
            <option value="eletronicos">Eletrônicos (80%)</option>
            <option value="livros">Livros (isento)</option>
            <option value="roupas">Roupas (35%)</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Calcular</button>
      </form>

      {erro && <p className="text-red-500 mt-4">{erro}</p>}

      {resultado && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Imposto estimado:</strong> R$ {resultado.estimatedTax.toFixed(2)}</p>
          <p><strong>Custo total:</strong> R$ {resultado.totalCost.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{resultado.notes}</p>
        </div>
      )}
    </div>
  );
}
