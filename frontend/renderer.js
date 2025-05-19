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

function fecharFormulario() {
  const form = document.getElementById('formularioInsert');
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

  document.getElementById('Number').value = result.Number;
  document.getElementById('Name').value = result.Name;
  document.getElementById('Descricao').value = result.Descricao;
  document.getElementById('LocalGuardado').value = result.LocalGuardado;
  document.getElementById('Area').value = result.Area;
  document.getElementById('Status').value = result.Status;
  document.getElementById('BarCode').value = result.BarCode;
  getFormulario();
}
