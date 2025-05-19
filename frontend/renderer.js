function insertFormulario() {
  const form = document.getElementById('formularioInsert');
  form.classList.remove('hidden'); // tira a classe que esconde
  form.classList.add('show');      // aplica a animação
}

function getFormulario() {
  const form = document.getElementById('formularioGet');
  form.classList.remove('hidden');
  form.classList.add('show');
}

function updateFormulario() {
  const id = document.getElementById('getId').value;
  console.log('atualizando id =', id);

  // ✅ copia os valores
  ['Number','Name','Descricao','LocalGuardado','Area','Status','BarCode']
    .forEach(field => {
      document.getElementById('update'+field)
        .value = document.getElementById('get'+field).value;
    });

  const form = document.getElementById('formularioUpdate');
  form.classList.remove('hidden');
  form.classList.add('show');
}

function fecharInsert() {
  const form = document.getElementById('formularioInsert');
  form.classList.remove('show');
  form.classList.add('hidden');
}

function fecharGet() {
  const form = document.getElementById('formularioGet');
  form.classList.remove('show');
  form.classList.add('hidden');
}

function fecharUpdate() {
  const form = document.getElementById('formularioUpdate');
  form.classList.remove('show');
  form.classList.add('hidden');
}

async function enviar() {
  const Number = document.getElementById('insertNumber').value;
  const Name = document.getElementById('insertName').value;
  const Descricao = document.getElementById('insertDescricao').value;
  const LocalGuardado = document.getElementById('insertLocalGuardado').value;
  const Area = document.getElementById('insertArea').value;
  const Status = document.getElementById('insertStatus').value;
  const BarCode = document.getElementById('insertBarCode').value;

  const body = {
    Number: Number,
    Name: Name,
    Descricao: Descricao,
    LocalGuardado: LocalGuardado,
    Area: Area,
    Status: Status,
    BarCode: BarCode
  };

  const response = await fetch('http://localhost:5000/archive/insert', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  const result = await response.json();
  console.log(result);
}

async function pesquisar() {
  const number = document.getElementById('searchNumber').value;
  const response = await fetch(`http://localhost:5000/archive/get/${number}`);
  const result = await response.json();

  document.getElementById('getNumber').value = result.Number;
  document.getElementById('getName').value = result.Name;
  document.getElementById('getDescricao').value = result.Descricao;
  document.getElementById('getLocalGuardado').value = result.LocalGuardado;
  document.getElementById('getArea').value = result.Area;
  document.getElementById('getStatus').value = result.Status;
  document.getElementById('getBarCode').value = result.BarCode;

  const id = document.getElementById('getId').value = result._id;
  console.log(id);
  console.log(result);
  getFormulario();
}

async function atualizar() {
  const id = document.getElementById('getId').value;  // pega o ObjectId correto

  // vai ler os campos editáveis
  const Number       = document.getElementById('updateNumber').value;
  const Name         = document.getElementById('updateName').value;
  const Descricao    = document.getElementById('updateDescricao').value;
  const LocalGuardado= document.getElementById('updateLocalGuardado').value;
  const Area         = document.getElementById('updateArea').value;
  const Status       = document.getElementById('updateStatus').value;
  const BarCode      = document.getElementById('updateBarCode').value;

  const body = { Number, Name, Descricao, LocalGuardado, Area, Status, BarCode };

  const response = await fetch(`http://localhost:5000/archive/update/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  const result = await response.json();
  console.log(result);
}

async function deletar() {
  const id = document.getElementById('getId').value;

  const response = await fetch(`http://localhost:5000/archive/delete/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });
  const result = await response.json();
  console.log(result);
}

