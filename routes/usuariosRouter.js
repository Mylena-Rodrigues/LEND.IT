const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const createAuthentication = require("../middlewares/CreateAuthentication");

//Listagem de usuários
router.get("/", usuariosController.index);
//Listar usuário específico
router.post("/info/", usuariosController.findOne);
//Autenticação de usuário
router.post("/auth", usuariosController.auth);
//Criação de Usuários
router.post("/register", createAuthentication, usuariosController.create);
//Atualização de Nome de Usuário
router.put("/", usuariosController.update);
//Atualização de Senha de Usuário
router.post("/edit-password", usuariosController.updatePassword);
//Deletando usuário
router.delete("/:id", usuariosController.delete);

module.exports = router;
