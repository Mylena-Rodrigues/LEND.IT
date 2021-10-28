const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const createAuthentication = require('../middlewares/CreateAuthentication');
const loginAuthentication = require('../middlewares/CreateAuthentication');

//Listagem de usuários
router.get('/', usuariosController.index);
//Criação de Usuários
router.post('/', createAuthentication, usuariosController.create);
//Atualização de Usuário
router.post('/editar-perfil', loginAuthentication, usuariosController.update);
//Deletando usuário
router.delete('/:id', usuariosController.delete);


module.exports = router;