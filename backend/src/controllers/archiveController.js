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

exports.get = async (req, res) => {
  try {
    const processNumber = req.params.Number;

    const process = await archiveServices.getProcess(processNumber);

    return res.status(200).json(process);
  }
  catch (error) {
    console.error('Error getting process:', error);
    return res.status(500).json({ message: 'Error getting process', error: error.message });
  }
}

exports.delete = async (req, res) => {
  try {
    const processNumber = req.params.Number;

    const process = await archiveServices.deleteProcess(processNumber);

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