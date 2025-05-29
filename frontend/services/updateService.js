import { fecharUpdate } from "../modals/updateModal.js";

export async function atualizar() {
  const id = document.getElementById('getId').value;
  const body = {
    Number: document.getElementById('updateNumber').value,
    Name: document.getElementById('updateName').value,
    Descricao: document.getElementById('updateDescricao').value,
    Area: document.getElementById('updateArea').value,
    Status: document.getElementById('updateStatus').value,
  };
  const res = await fetch(
    `http://localhost:5000/archive/update/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  console.log(await res.json());
  fecharUpdate();
}
