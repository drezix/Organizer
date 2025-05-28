import { fecharInsert } from '../modals/insertModal.js';

export async function enviar() {
  const body = {
    Number: document.getElementById('insertNumber').value,
    Name: document.getElementById('insertName').value,
    Descricao: document.getElementById('insertDescricao').value,
    Area: document.getElementById('insertArea').value,
    Status: document.getElementById('insertStatus').value,
    BarCode: document.getElementById('insertBarCode').value,
  };
  const res = await fetch('http://localhost:5000/archive/insert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  console.log(await res.json());
  fecharInsert();
}