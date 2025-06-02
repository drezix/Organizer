export function updateFormulario() {
  ['Number', 'Name', 'Descricao', 'Status', 'Area'].forEach(field => {
    document.getElementById('update' + field).value =
      document.getElementById('get' + field).value;
  });
  document.getElementById('updateArea').value =
    document.getElementById('getArea').value || '';

  const modal = document.getElementById('modalUpdate');
  modal.classList.remove('hidden');
  modal.classList.add('show');
  document.getElementById('updateNumber')?.focus();
}

export function fecharUpdate() {
  const modal = document.getElementById('modalUpdate');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}