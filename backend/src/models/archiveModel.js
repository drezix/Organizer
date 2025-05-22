const mongoose = require('mongoose');
const { Schema } = mongoose;

function getInicial (name) {
  return name.trim().charAt(0).toUpperCase();
}

const archiveSchema = new Schema({
  Number: {
    type: Number,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Descricao: {
    type: String,
    required: true
  },
  LocalGuardado: {
    type: String,
    required: true
  },
  Area: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  BarCode: {
    type: String,
    required: true,
    unique: true
  }
})

archiveSchema.pre('validate', async function(next) {
  if (!this.isNew && !this.isModified('Name')) {
    return next();
  }

  const inicial = getInicial(this.Name);

  const count = await mongoose.model('Process')
    .countDocuments({ Name: new RegExp('^' + inicial, 'i') });

  const indice = count + 1;               // ex: 41, 42, ...
  const gavetaNum = Math.ceil(indice / 50); // 1 pra 1–50, 2 pra 51–100, etc.
  const espaco = ((indice - 1) % 50) + 1;   // 1–50

  this.LocalGuardado = `Sala de Arquivos - Gaveta: ${inicial}${gavetaNum} - Espaço: ${espaco}`  

  next();
});

archiveSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  // só recalcula se quem mudou foi o Name:
  if (update.Name) {
    const inicial = getInicial(update.Name);
    const count = await this.model.countDocuments({
      Name: new RegExp('^' + inicial, 'i')
    });
    const indice    = count + 1;
    const gavetaNum = Math.ceil(indice / 50);
    const espaco    = ((indice - 1) % 50) + 1;

    update.LocalGuardado = 
      `Sala de Arquivos - Gaveta: ${inicial}${gavetaNum} - Espaço: ${espaco}`;
    this.setUpdate(update);
  }
  next();
});

archiveSchema.index({ Name: 1 });

module.exports = mongoose.model('Process', archiveSchema);