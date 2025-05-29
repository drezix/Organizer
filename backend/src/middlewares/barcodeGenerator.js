function gerarCodigoBoletoFake(valor = 0, vencimento = '2025-12-31') {
  const banco = '001'; // Código fictício de banco
  const moeda = '9'; // Real
  const fatorVenc = calcularFatorVencimento(vencimento); // 4 dígitos
  const valorFormatado = valor.toFixed(2).replace('.', '').padStart(10, '0'); // 10 dígitos

  // Campo livre fake (25 dígitos aleatórios mas formatados)
  const campoLivre = gerarCampoLivreFake(25);

  const base = banco + moeda + fatorVenc + valorFormatado + campoLivre;
  const dv = calcularModulo11(base);

  const codigoBarras = base.slice(0, 4) + dv + base.slice(4);
  return codigoBarras;
}

function calcularFatorVencimento(dataStr) {
  const base = new Date('1997-10-07');
  const venc = new Date(dataStr);
  const diff = Math.floor((venc - base) / (1000 * 60 * 60 * 24));
  return diff.toString().padStart(4, '0');
}

function gerarCampoLivreFake(tamanho) {
  let campo = '';
  for (let i = 0; i < tamanho; i++) {
    campo += Math.floor(Math.random() * 10); // dígito aleatório de 0 a 9
  }
  return campo;
}

function calcularModulo11(numero) {
  let soma = 0;
  let peso = 2;

  for (let i = numero.length - 1; i >= 0; i--) {
    soma += parseInt(numero[i]) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const resto = soma % 11;
  if (resto === 0 || resto === 1 || resto === 10) return '1';
  return (11 - resto).toString();
}

module.exports = {
  gerarCodigoBoletoFake,
};