const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/usuariosController');

//Listagem de Emprestimos
router.get('/', emprestimosController.index);
//Criação de Emprestimos
router.post('/', emprestimosController.create);
//Atualização de Emprestimos
router.post('/:id', emprestimosController.update);
//Deletando Emprestimos
router.delete('/:id', emprestimosController.delete);

module.exports = router;