const archiveController = require('../controllers/archiveController');
const express = require('express');
const router = express.Router();

router.post('/insert', archiveController.insert);
router.get('/get/:Number', archiveController.get);
router.delete('/delete/:Number', archiveController.delete);

module.exports = router;