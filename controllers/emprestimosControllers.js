const Emprestimos = require('../models/Emprestimos');

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
        const { item, contato, data_emp, data_devo, result_devo } = req.body;
        const novoEmp = await Usuarios().create(
            { 
                item_emprestado: item, 
                contato_devolucao: contato, 
                data_emprestimo: data_emp, 
                data_devolucao: data_devo, 
                resultado_devolucao: result_devo 
            })
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
        const { item, contato, data_emp, data_devo, result_devo } = req.body;
        const modEmp = await Usuarios().update(
            { 
                item_emprestado: item, 
                contato_devolucao: contato, 
                data_emprestimo: data_emp, 
                data_devolucao: data_devo, 
                resultado_devolucao: result_devo  
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
        const delEmp = await Usuarios().destroy({ where: { id } })
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