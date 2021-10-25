const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.index);

module.exports = router;