let idParaDeletar = null;

// ---------- MODAL INSERIR ----------
function insertFormulario() {
  const modal = document.getElementById('modalInsert');
  modal.classList.remove('hidden');
  modal.classList.add('show');
  document.getElementById('insertNumber')?.focus();
}

function fecharInsert() {
  const modal = document.getElementById('modalInsert');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

// ---------- MODAL ATUALIZAR ----------
function updateFormulario() {
  ['Number', 'Name', 'Descricao', 'Status', 'BarCode', 'Area'].forEach(field => {
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

function fecharUpdate() {
  const modal = document.getElementById('modalUpdate');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

// ---------- PESQUISA E RENDERIZAÇÃO DE CARDS ----------
async function pesquisar() {
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
        String(proc.Status).toLowerCase().includes(term) ||
        String(proc.BarCode).toLowerCase().includes(term);
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
        <h3>#${proc.Number} – ${proc.Name}</h3>
        <p>Status: ${proc.Status}</p>
        <p>Área: ${proc.Area}</p>
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

function abrirModal(proc) {
  document.getElementById('getNumber').value = proc.Number;
  document.getElementById('getName').value = proc.Name;
  document.getElementById('getDescricao').value = proc.Descricao;
  document.getElementById('getLocalGuardado').value = proc.LocalGuardado;
  document.getElementById('getArea').value = proc.Area;
  document.getElementById('getStatus').value = proc.Status;
  document.getElementById('getBarCode').value = proc.BarCode;
  document.getElementById('getId').value = proc._id;

  const modal = document.getElementById('modalGet');
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

function fecharGet() {
  const modal = document.getElementById('modalGet');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

// ---------- FUNÇÕES CRUD ----------
async function enviar() {
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

async function atualizar() {
  const id = document.getElementById('getId').value;
  const body = {
    Number: document.getElementById('updateNumber').value,
    Name: document.getElementById('updateName').value,
    Descricao: document.getElementById('updateDescricao').value,
    Area: document.getElementById('updateArea').value,
    Status: document.getElementById('updateStatus').value,
    BarCode: document.getElementById('updateBarCode').value,
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

function deletar() {
  idParaDeletar = document.getElementById('getId').value;
  if (!idParaDeletar) return alert('Selecione um processo.');
  const modal = document.getElementById('modalConfirmDelete');
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

async function confirmarDelete() {
  if (!idParaDeletar) return;
  const res = await fetch(
    `http://localhost:5000/archive/delete/${idParaDeletar}`,
    { method: 'DELETE' }
  );
  console.log(await res.json());
  document.getElementById('modalConfirmDelete').classList.remove('show');
  document.getElementById('modalConfirmDelete').classList.add('hidden');
  fecharGet();
  limparCamposGet();
  idParaDeletar = null;
}

function cancelarDelete() {
  const modal = document.getElementById('modalConfirmDelete');
  modal.classList.remove('show');
  modal.classList.add('hidden');
  idParaDeletar = null;
}

function limparCamposGet() {
  ['Number', 'Name', 'Descricao', 'LocalGuardado', 'Area', 'Status', 'BarCode', 'Id'].forEach(
    f => {
      const el = document.getElementById('get' + f);
      if (el) el.value = '';
    }
  );
}

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