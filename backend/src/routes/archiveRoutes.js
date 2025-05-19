const archiveController = require('../controllers/archiveController');
const express = require('express');
const router = express.Router();

router.post('/insert', archiveController.insert);
router.get('/get/:Number', archiveController.get);
router.delete('/delete/:id', archiveController.delete);
router.put('/update/:id', archiveController.update);

module.exports = router;