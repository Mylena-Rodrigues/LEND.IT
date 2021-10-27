const Emprestimos = require('../models/Emprestimos');
const moment = require ('moment')

const emprestimosControllers = {
    //Listar Emprestimos
    index: async (req, res) => {
        const listEmprestimos = await Emprestimos().findAll()
            .then((listEmprestimos) => {
                console.log(listEmprestimos);
            })
            .catch((err) => {
                console.log("Error to list loans: ", err);
            })
        return res.json(listEmprestimos);
    },

    //Criar emprestimo
    create: async (req, res) => {
        const { item_emprestado, contato_devolucao, data_emprestimo, data_devolucao, resultado_devolucao } = req.body;
        const novoEmp = await Emprestimos().create(
            {item_emprestado, contato_devolucao, data_emprestimo, data_devolucao, resultado_devolucao})
            .then((novoEmp) => {
                console.log(novoEmp);
            })
            .catch((err) => {
                console.log("Error to create loan: ", err);
            })
        return res.json(novoEmp);
    },

    //Atualizar Emprestimo
    update: async (req, res) => {
        const { id } = req.params;
        const { item_emprestado, contato_devolucao, data_emprestimo, data_devolucao,    resultado_devolucao } = req.body;
        const modEmp = await Emprestimos().update(
            { 
                item_emprestado, 
                contato_devolucao, 
                data_emprestimo, 
                data_devolucao, 
                resultado_devolucao
            }, 
                { where: { id }}
            )
            .then((modUsuario) => {
                console.log(modUsuario);
            })
            .catch((err) => {
                console.log("Error to update loan: ", err);
            })
        return res.send(modEmp);
    },

    //Deletar Emprestimo
    delete: async (req, res) => {
        const { id } = req.params;
        const delEmp = await Emprestimos().destroy({ where: { id } })
            .then((delUsuario) => {
                console.log(delUsuario);
            })
            .catch((err) => {
                console.log("Error to delete loan: ", err);
            })
        return res.json(delEmp);
    }
}

module.exports = emprestimosControllers;