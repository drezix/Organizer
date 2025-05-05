const archiveModel = require('../models/archiveModel');

exports.registerProcess = async (data) => {
  const { Number, Name, Descricao, LocalGuardado, Area, Status, BarCode } = data;
  const existingProcess = await archiveModel.findOne({
    Number
  });
  if (existingProcess) {
    throw new Error('Process already exists');
  }

  const newProcess = new archiveModel({
    Number,
    Name,
    Descricao,
    LocalGuardado,
    Area,
    Status,
    BarCode
  });

  return await newProcess.save();
}

exports.getProcess = async (Number) => {
  if (!Number) {
    throw new Error('Número incorreto ou não existe');
  }
  return await archiveModel.findOne({ Number })
}

exports.deleteProcess = async (Number) => {	
  if (!Number) {
    throw new Error('Número incorreto ou não existe');
  }
  const process = await archiveModel.findOneAndDelete(
    {
      Number
    }
  );
  if (!process) {
    throw new Error('Processo não encontrado');
  }

  return process;
}

exports.updateProcess = async (id, data) => {
  const { Number, Name, Descricao, LocalGuardado, Area, Status, BarCode } = data;

  const updatedProcess = await archiveModel.findByIdAndUpdate(
    id,
    { Number, Name, Descricao, LocalGuardado, Area, Status, BarCode },
    { new: true } // Retorna o documento atualizado
  );

  if (!updatedProcess) {
    throw new Error('Processo não encontrado');
  }

  return updatedProcess;
}
