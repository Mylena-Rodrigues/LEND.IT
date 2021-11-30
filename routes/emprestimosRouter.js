const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosControllers.js");

//Listagem de Emprestimos
router.get("/", emprestimosController.index);
//Listagem de Emprestimos de usuario
router.post("/list/", emprestimosController.userLoanList);
//Criação de Emprestimos
router.post("/", emprestimosController.create);
//Atualização de Emprestimos
router.put("/:id", emprestimosController.update);
//Deletando Emprestimos
router.delete("/", emprestimosController.delete);

module.exports = router;
