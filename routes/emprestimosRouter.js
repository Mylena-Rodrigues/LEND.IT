const express = require("express");
const router = express.Router();
const emprestimosControllers = require("../controllers/emprestimosControllers.js");

//Listagem de Emprestimos
router.get("/", emprestimosControllers.index);
//Listagem de Emprestimos de usuario
router.post("/list/", emprestimosControllers.userLentList);
//Criação de Emprestimos
router.post("/", emprestimosControllers.create);
//Atualização de Emprestimos
router.put("/", emprestimosControllers.update);
//Devolução de Emprestimos
router.patch("/back/", emprestimosControllers.giveBack);
//Deletando Emprestimos
router.delete("/", emprestimosControllers.delete);

module.exports = router;
