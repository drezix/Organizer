const archiveController = require('../controllers/archiveController');
const express = require('express');
const router = express.Router();

router.get('/search', archiveController.search);

// obter detalhes de 1 processo clicado (ex: GET /archive/123abc)
router.get('/:id', archiveController.getById);

router.post('/insert', archiveController.insert);
router.put('/update/:id', archiveController.update);
router.delete('/delete/:id', archiveController.delete);

module.exports = router;