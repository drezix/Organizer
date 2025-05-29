import { abrirModal } from '../modals/getModal.js';

export async function pesquisar() {
  const errorDiv = document.getElementById('searchError');
  const cardsContainer = document.getElementById('cardsContainer');
  const term = document
    .getElementById('searchTerm')
    .value.trim()
    .toLowerCase();
  const areaFilter = document.getElementById('searchArea').value;

  errorDiv.style.display = 'none';
  errorDiv.textContent = '';
  cardsContainer.innerHTML = '';

  if (!term && !areaFilter) {
    errorDiv.textContent =
      'Insira um termo de busca ou selecione uma área.';
    errorDiv.style.display = 'block';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/archive/search');
    if (!res.ok) throw new Error('Erro no servidor');
    const results = await res.json();

    const filtrados = results.filter(proc => {
      const numStr = String(proc.Number).toLowerCase();
      const nameStr = proc.Name.toLowerCase();
      const textMatch =
        !term ||
        numStr.includes(term) ||
        nameStr.includes(term) ||
        String(proc.Descricao).toLowerCase().includes(term) ||
        String(proc.Status).toLowerCase().includes(term);
      const areaMatch = !areaFilter || proc.Area === areaFilter;
      return textMatch && areaMatch;
    });

    if (!filtrados.length) {
      errorDiv.textContent = 'Nenhum processo encontrado.';
      errorDiv.style.display = 'block';
      return;
    }

    filtrados.forEach(proc => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${proc.Number} <br> ${proc.Name}</h3>
        <p>Status: ${proc.Status}</p>
        <p>Área: ${proc.Area}</p>
        <p>Código de barras: ${proc.BarCode}</p>
      `;
      card.addEventListener('click', () => abrirModal(proc));
      cardsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    errorDiv.textContent = 'Erro ao buscar processos.';
    errorDiv.style.display = 'block';
  }
}