const mongoose = require('mongoose');

function getInicial (name) {
  return name.trim().charAt(0).toUpperCase();
}

async function getNextSlot(inicial) {
  // busca somente o campo LocalGuardado
  const docs = await mongoose.model('Process')
    .find({ Name: new RegExp('^' + inicial, 'i') }, 'LocalGuardado')
    .lean();

  // extrai os pares [gaveta, espaço]
  const slots = docs
    .map(d => {
      const re = new RegExp(`Sala de Arquivos - Gaveta: ${inicial}(\\d+) - Espaço: (\\d+)`);
      const match = d.LocalGuardado.match(re);
      return match ? [parseInt(match[1], 10), parseInt(match[2], 10)] : null;
    })
    .filter(Boolean);

  // percorre gavetas até achar uma com espaço livre
  for (let gaveta = 1; ; gaveta++) {
    const used = slots
      .filter(([g]) => g === gaveta)
      .map(([, e]) => e);

    if (used.length < 50) {
      for (let esp = 1; esp <= 50; esp++) {
        if (!used.includes(esp)) {
          return { gavetaNum: gaveta, espaco: esp };
        }
      }
    }
  }
}

async function setLocalGuardado(doc, name) {
  const inicial = getInicial(name);
  const { gavetaNum, espaco } = await getNextSlot(inicial);
  doc.LocalGuardado = `Sala de Arquivos - Gaveta: ${inicial}${gavetaNum} - Espaço: ${espaco}`;
}

module.exports = { getNextSlot, setLocalGuardado };