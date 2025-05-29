const mongoose = require('mongoose');
const { Schema } = mongoose;
const { setLocalGuardado } = require('../middlewares/slotFinder');
const { gerarCodigoBoletoFake } = require('../middlewares/barcodeGenerator');

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

// ao validar (inserção ou alteração de Name)
archiveSchema.pre('validate', async function (next) {
  if (this.isModified('Name')) {
    await setLocalGuardado(this, this.Name);
  }

  // Só gera se ainda não tiver
  if (!this.BarCode) {
    const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.BarCode = gerarCodigoBoletoFake(this.Number || 0, hoje);
  }

  next();
});

// ao atualizar via findOneAndUpdate
archiveSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.Name) {
    // cria um doc temporário para atribuir LocalGuardado
    const temp = {};
    await setLocalGuardado(temp, update.Name);
    update.LocalGuardado = temp.LocalGuardado;
    this.setUpdate(update);
  }
  next();
});

archiveSchema.index({ Name: 1 });

module.exports = mongoose.model('Process', archiveSchema);