// -------------- INSERT ---------------
import { insertFormulario, fecharInsert} from "./modals/insertModal.js";
import { enviar } from "./services/insertService.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnInsert")?.addEventListener("click", insertFormulario);
  document.getElementById("btnFecharInsert")?.addEventListener("click", fecharInsert);
  document.getElementById("btnEnviar")?.addEventListener("click", enviar);
});

// ------------- PESQUISAR -------------
import { abrirModal, fecharGet } from "./modals/getModal.js";
import { pesquisar } from "./services/getService.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnGet")?.addEventListener("click", abrirModal);
  document.getElementById("btnFecharGet")?.addEventListener("click", fecharGet);
  document.getElementById("btnPesquisar")?.addEventListener("click", () => {
    console.log('Clique detectado!');
    pesquisar();
  });
});

// ------------- ATUALIZAR -------------
import { updateFormulario, fecharUpdate } from "./modals/updateModal.js";
import { atualizar } from "./services/updateService.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnUpdate")?.addEventListener("click", updateFormulario);
  document.getElementById("btnFecharUpdate")?.addEventListener("click", fecharUpdate);
  document.getElementById("btnAtualizar")?.addEventListener("click", atualizar);
});

// -------------- DELETAR --------------
import { abrirModalDelete, confirmarDelete, cancelarDelete } from './modals/deleteModal.js';

document.addEventListener("DOMContentLoaded", () => {
  // botão dentro do “get-modal” que dispara a confirmação
  document.getElementById("btnOpenDelete")
    .addEventListener("click", abrirModalDelete);

  // botões do “confirm-modal”
  document.getElementById("btnConfirmYes")
    .addEventListener("click", confirmarDelete);
  document.getElementById("btnConfirmNo")
    .addEventListener("click", cancelarDelete);
});

// ---------- LIMPAR CAMPOS ------------

import { limparCamposGet } from "./modals/getModal.js";

limparCamposGet();

// ----------- FECHAR MODAIS -----------

// Fecha modais clicando fora
['modalInsert', 'modalUpdate', 'modalGet', 'modalConfirmDelete'].forEach(
  id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) {
        const fnName =
          id === 'modalInsert'
            ? 'fecharInsert'
            : id === 'modalUpdate'
            ? 'fecharUpdate'
            : id === 'modalGet'
            ? 'fecharGet'
            : 'cancelarDelete';
        window[fnName]();
      }
    });
  }
);