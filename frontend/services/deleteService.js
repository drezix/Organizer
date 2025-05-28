export async function deleteById(id) {
  const res = await fetch(`http://localhost:5000/archive/delete/${id}`, { method: 'DELETE' });
  console.log(await res.json());
}
