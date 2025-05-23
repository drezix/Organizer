const mongoose = require('mongoose');
const { Schema } = mongoose;
const { getNextSlot, setLocalGuardado } = require('../middlewares/slotFinder');

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
archiveSchema.pre('validate', async function(next) {
  if (!this.isModified('Name')) return next();
  await setLocalGuardado(this, this.Name);
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