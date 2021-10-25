const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/usuariosController');

router.get('/', emprestimosController.index);

module.exports = router;