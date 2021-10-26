const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

//Listagem de usuários
router.get('/', usuariosController.index);
//Criação de Usuários
router.post('/', usuariosController.create);
//Atualização de Usuário
router.post('/:id', usuariosController.update);
//Deletando usuário
router.delete('/:id', usuariosController.delete);


module.exports = router;