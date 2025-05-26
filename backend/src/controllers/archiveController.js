const archiveServices = require('../services/archiveServices');

exports.insert = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const processData = req.body;

    const process = await archiveServices.registerProcess(processData);

    return res.status(201).json(process);
    
  } 
  catch (error) {
    console.error('Error inserting process:', error);
    return res.status(500).json({ message: 'Error inserting process', error: error.message });
  }
}

exports.search = async (req, res) => {
  try {
    // req.query pode ter Number, Name, Area, Status, ...
    const filters = req.query;
    const results = await archiveServices.searchProcesses(filters);
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error searching processes:', error);
    return res.status(500).json({ message: 'Erro ao buscar processos', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const process = await archiveServices.getProcessById(req.params.id);
    if (!process) return res.status(404).json({ message: 'Processo não encontrado' });
    return res.status(200).json(process);
  } catch (error) {
    console.error('Error getting process by id:', error);
    return res.status(500).json({ message: 'Erro ao obter processo', error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const process = await archiveServices.deleteProcess(id);

    return res.status(200).json(process);
  }
  catch (error) {
    console.error('Error deleting process:', error);
    return res.status(500).json({ message: 'Error deleting process', error: error.message });
  }
}

exports.update = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { id } = req.params;
    const processData = req.body;

    const updatedProcess = await archiveServices.updateProcess(id, processData);

    return res.status(200).json(updatedProcess);
  } 
  catch (error) {
    console.error('Error updating process:', error);
    return res.status(500).json({ message: 'Error updating process', error: error.message });
  }
}