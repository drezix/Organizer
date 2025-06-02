// ---------- MODAL INSERIR ----------
export function insertFormulario() {
  const modal = document.getElementById('modalInsert');
  modal.classList.remove('hidden');
  modal.classList.add('show');
  document.getElementById('insertNumber')?.focus();
}

export function fecharInsert() {
  const modal = document.getElementById('modalInsert');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

