
async function atualizar() {
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

  const response = await fetch('http://localhost:5000/archive/update', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    params: { Number: Number },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  console.log(result);
}
