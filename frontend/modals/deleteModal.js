import { deleteById } from '../services/deleteService.js';
import { fecharGet, limparCamposGet } from './getModal.js';

let idParaDeletar = null;

export function abrirModalDelete() {
  idParaDeletar = document.getElementById('getId').value;
  if (!idParaDeletar) return alert('Selecione um processo.');
  const modal = document.getElementById('modalConfirmDelete');
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

export async function confirmarDelete() {
  await deleteById(idParaDeletar);
  document.getElementById('modalConfirmDelete').classList.replace('show', 'hidden');
  fecharGet();
  limparCamposGet();
  idParaDeletar = null;
}

export function cancelarDelete() {
  document.getElementById('modalConfirmDelete').classList.replace('show', 'hidden');
  idParaDeletar = null;
}