const express = require("express");
const router = express.Router();
const cedidosControllers = require("../controllers/cedidosControllers");

//Listagem de Emprestimos
router.get("/", cedidosControllers.index);
//Listagem de Emprestimos de usuario
router.post("/list/", cedidosControllers.userLoanList);
//Criação de Emprestimos
router.post("/", cedidosControllers.create);
//Atualização de Emprestimos
router.put("/", cedidosControllers.update);
//Deletando Emprestimos
router.delete("/", cedidosControllers.delete);

module.exports = router;
