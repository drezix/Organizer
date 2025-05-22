let idParaDeletar = null;  // Variável global para armazenar o id do processo que será deletado

// ---------- MODAL INSERIR ----------
function insertFormulario() {
  const modal = document.getElementById('modalInsert');
  modal.classList.remove('hidden');
  modal.classList.add('show');

  const inputNumber = document.getElementById('insertNumber');
  if (inputNumber) inputNumber.focus();
}

function fecharInsert() {
  const modal = document.getElementById('modalInsert');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

// ---------- MODAL ATUALIZAR ----------
function updateFormulario() {
  const id = document.getElementById('getId').value;

  ['Number','Name','Descricao','Status','BarCode']
    .forEach(field => {
      document.getElementById('update'+field).value = document.getElementById('get'+field).value;
    });

  const areaValue = document.getElementById('getArea').value;
  const updateAreaSelect = document.getElementById('updateArea');
  if (updateAreaSelect) {
    updateAreaSelect.value = areaValue || "";
  }

  const modal = document.getElementById('modalUpdate');
  modal.classList.remove('hidden');
  modal.classList.add('show');

  const inputNumber = document.getElementById('updateNumber');
  if (inputNumber) inputNumber.focus();
}

function fecharUpdate() {
  const modal = document.getElementById('modalUpdate');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

// ---------- MODAL VISUALIZAR (BUSCA) ----------
async function pesquisar() {
  const number = document.getElementById('searchNumber').value.trim();
  const errorDiv = document.getElementById('searchError');

  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  if (!number) {
    errorDiv.textContent = 'Por favor, insira um número de processo para pesquisar.';
    errorDiv.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/archive/get/${number}`);

    if (!response.ok) {
      errorDiv.textContent = 'Número do processo não encontrado.';
      errorDiv.style.display = 'block';
      return;
    }

    const result = await response.json();

    document.getElementById('getNumber').value = result.Number;
    document.getElementById('getName').value = result.Name;
    document.getElementById('getDescricao').value = result.Descricao;
    document.getElementById('getLocalGuardado').value = result.LocalGuardado;
    document.getElementById('getArea').value = result.Area;
    document.getElementById('getStatus').value = result.Status;
    document.getElementById('getBarCode').value = result.BarCode;

    document.getElementById('getId').value = result._id;

    const modal = document.getElementById('modalGet');
    modal.classList.remove('hidden');
    modal.classList.add('show');

  } catch (error) {
    console.error('Erro ao pesquisar processo:', error);
    errorDiv.textContent = 'Ocorreu um erro ao tentar buscar o processo.';
    errorDiv.style.display = 'block';
  }
}

function fecharGet() {
  const modal = document.getElementById('modalGet');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

// ---------- FUNÇÕES CRUD ----------

async function enviar() {
  const Number = document.getElementById('insertNumber').value;
  const Name = document.getElementById('insertName').value;
  const Descricao = document.getElementById('insertDescricao').value;
  const Area = document.getElementById('insertArea').value;
  const Status = document.getElementById('insertStatus').value;
  const BarCode = document.getElementById('insertBarCode').value;

  const body = { Number, Name, Descricao, Area, Status, BarCode };

  const response = await fetch('http://localhost:5000/archive/insert', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  const result = await response.json();
  console.log(result);
  fecharInsert();
}

async function atualizar() {
  const id = document.getElementById('getId').value;

  const Number       = document.getElementById('updateNumber').value;
  const Name         = document.getElementById('updateName').value;
  const Descricao    = document.getElementById('updateDescricao').value;
  const Area         = document.getElementById('updateArea').value;
  const Status       = document.getElementById('updateStatus').value;
  const BarCode      = document.getElementById('updateBarCode').value;

  const body = { Number, Name, Descricao, Area, Status, BarCode };

  const response = await fetch(`http://localhost:5000/archive/update/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  const result = await response.json();
  console.log(result);
  fecharUpdate();
}

function deletar() {
  idParaDeletar = document.getElementById('getId').value;
  if (!idParaDeletar) {
    alert('Nenhum processo selecionado para deletar.');
    return;
  }

  const modal = document.getElementById('modalConfirmDelete');
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

async function confirmarDelete() {
  if (!idParaDeletar) return;

  const response = await fetch(`http://localhost:5000/archive/delete/${idParaDeletar}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  const result = await response.json();
  console.log(result);

  const modalConfirm = document.getElementById('modalConfirmDelete');
  modalConfirm.classList.remove('show');
  modalConfirm.classList.add('hidden');

  fecharGet();
  limparCamposGet();

  idParaDeletar = null;
}

function cancelarDelete() {
  const modalConfirm = document.getElementById('modalConfirmDelete');
  modalConfirm.classList.remove('show');
  modalConfirm.classList.add('hidden');
  idParaDeletar = null;
}

function limparCamposGet() {
  ['Number', 'Name', 'Descricao', 'LocalGuardado', 'Area', 'Status', 'BarCode', 'Id'].forEach(field => {
    const el = document.getElementById('get' + field);
    if (el) el.value = '';
  });
}

// Fecha modais ao clicar fora do conteúdo modal
document.getElementById('modalInsert').addEventListener('click', e => {
  if(e.target.id === 'modalInsert') fecharInsert();
});

document.getElementById('modalUpdate').addEventListener('click', e => {
  if(e.target.id === 'modalUpdate') fecharUpdate();
});

document.getElementById('modalGet').addEventListener('click', e => {
  if(e.target.id === 'modalGet') fecharGet();
});

document.getElementById('modalConfirmDelete').addEventListener('click', e => {
  if(e.target.id === 'modalConfirmDelete') cancelarDelete();
});