const archiveModel = require('../models/archiveModel');

exports.registerProcess = async (data) => {
  const { Number, Name, Descricao, Area, Status } = data;
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
    Area,
    Status,
  });

  return await newProcess.save();
}

exports.searchProcesses = async (filters = {}) => {
  // Remove campos falsy (undefined, '') pra não poluir a query
  const cleanFilters = Object.entries(filters)
    .filter(([_, v]) => v !== undefined && v !== '')
    .reduce((obj, [k, v]) => {
      // se for Number, converte pra Number
      obj[k] = k === 'Number' ? Number(v) : v;
      return obj;
    }, {});

  return await archiveModel.find(cleanFilters).exec();
};

exports.getProcessById = async (id) => {
  if (!id) throw new Error('ID incorreto ou não existe');
  return await archiveModel.findById(id).exec();
};

exports.deleteProcess = async (id) => {	
  if (!id) {
    throw new Error('Número incorreto ou não existe');
  }
  const process = await archiveModel.findByIdAndDelete(id);
  if (!process) {
    throw new Error('Processo não encontrado');
  }

  return process;
}

exports.updateProcess = async (id, data) => {
  const { Number, Name, Descricao, Area, Status } = data;

  const updatedProcess = await archiveModel.findByIdAndUpdate(
    id,
    { Number, Name, Descricao, Area, Status },
    { new: true } // Retorna o documento atualizado
  );

  if (!updatedProcess) {
    throw new Error('Processo não encontrado');
  }

  return updatedProcess;
}