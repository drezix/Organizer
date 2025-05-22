const BASE_URL = 'http://localhost:5000/archive';

export async function getArchive(number) {
  const res = await fetch(`${BASE_URL}/get/${number}`);
  if (!res.ok) throw new Error('Número do processo não encontrado');
  return res.json();
}

export async function insertArchive(data) {
  const res = await fetch(`${BASE_URL}/insert`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Falha ao inserir');
  return res.json();
}

export async function updateArchive(id, data) {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Falha ao atualizar');
  return res.json();
}

export async function deleteArchive(id) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  if (!res.ok) throw new Error('Falha ao deletar');
  return res.json();
}
