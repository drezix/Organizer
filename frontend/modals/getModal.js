export function abrirModal(proc) {
  document.getElementById('getNumber').value = proc.Number;
  document.getElementById('getName').value = proc.Name;
  document.getElementById('getDescricao').value = proc.Descricao;
  document.getElementById('getLocalGuardado').value = proc.LocalGuardado;
  document.getElementById('getArea').value = proc.Area;
  document.getElementById('getStatus').value = proc.Status;
  document.getElementById('getBarCode').value = proc.BarCode;
  document.getElementById('getId').value = proc._id;

  const svg = document.getElementById('visualBarCode');
  svg.innerHTML = '';

  // renderiza o código de barras
  JsBarcode(svg, proc.BarCode, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 80,
    displayValue: true,
  });

  const modal = document.getElementById('modalGet');
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

export function fecharGet() {
  const modal = document.getElementById('modalGet');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

export function limparCamposGet() {
  ['Number', 'Name', 'Descricao', 'LocalGuardado', 'Area', 'Status', 'BarCode', 'Id'].forEach(
    f => {
      const el = document.getElementById('get' + f);
      if (el) el.value = '';
    }
  );
}
