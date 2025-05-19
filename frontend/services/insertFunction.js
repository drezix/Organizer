function abrirFormulario() {
  const form = document.getElementById('formulario');
  form.classList.remove('hidden'); // tira a classe que esconde
  form.classList.add('show');      // aplica a animação
}

function abrirFormulario() {
  const form = document.getElementById('formulario');
  form.classList.remove('hidden');
  form.classList.add('show');
}

function fecharFormulario() {
  const form = document.getElementById('formulario');
  form.classList.remove('show');
  form.classList.add('hidden');
}

async function enviar() {
  const Number = document.getElementById('Number').value;
  const Name = document.getElementById('Name').value;
  const Descricao = document.getElementById('Descricao').value;
  const LocalGuardado = document.getElementById('LocalGuardado').value;
  const Area = document.getElementById('Area').value;
  const Status = document.getElementById('Status').value;
  const BarCode = document.getElementById('BarCode').value;

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

module.exports = { abrirFormulario, fecharFormulario, enviar };