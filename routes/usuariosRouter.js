const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const createAuthentication = require('../middlewares/CreateAuthentication');

//Listagem de usuários
router.get('/', usuariosController.index);

//Autenticação de usuário
router.post('/auth', usuariosController.auth);
//Criação de Usuários
router.post('/register', createAuthentication, usuariosController.create);
//Atualização de Nome de Usuário
router.post('/edit-name', usuariosController.updateName);
//Atualização de Email de Usuário
router.post('/edit-email', usuariosController.updateEmail);
//Atualização de Senha de Usuário
router.post('/edit-password', usuariosController.updatePassword);
//Deletando usuário
router.delete('/:id', usuariosController.delete);


module.exports = router;