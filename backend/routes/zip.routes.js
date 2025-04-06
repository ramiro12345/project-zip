const express = require('express');
const router = express.Router();
const zipController = require('../controllers/zip.controller');

router.post('/process-zip', zipController.processZip);
router.get('/files', zipController.getFiles);

module.exports = router;
