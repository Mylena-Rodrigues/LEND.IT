const Cedidos = require('../models/Cedidos');
const moment = require ('moment');

const cedidosControllers = {
    //Listar Cedidos
    index: async (req, res) => {
        const listCedidos = await Cedidos().findAll()
            .then(() => {
                return res.status(200).json(listCedidos);
            })
            .catch((err) => {
                console.log("Error to list loans: ", err);
            })
    },

    //Listar Cedidos de um usuário especifico
    userLoanList: async (req, res) => {
        const id = req.params;
        // const id = JSON.parse(localStorage.getItem('@lendit/user_id'));
        const listCedidos = await Cedidos().findAll({where: {id_usuario_n_donoObj: id}})
        .then(() => {
            return res.status(200).json(listCedidos);
        })
        .catch((err) => {
            console.log("Error to list user loans: ", err);
        })
        
    },

    //Criar emprestimo
    create: async (req, res) => {
        const id = localStorage.getItem('@lendit/user_id');
        const { item_peguei_emprestado, contato_celular_devolucao, contato_email_devolucao, data_emprestimo, data_devolucao, resultado_devolucao } = req.body;
        const novoEmp = await Cedidos().create(
            {id_usuario_donoObj: id, item_peguei_emprestado, contato_celular_devolucao, contato_email_devolucao, data_emprestimo, data_devolucao, resultado_devolucao})
            .then(() => {
                return res.status(200).json(novoEmp);
            })
            .catch((err) => {
                console.log("Error to create loan: ", err);
            })
    },

    //Atualizar Emprestimo
    update: async (req, res) => {
        const { id } = req.params;
        const { item_peguei_emprestado, contato_celular_devolucao, contato_email_devolucao, data_emprestimo, data_devolucao, resultado_devolucao } = req.body;
        const modEmp = await Cedidos().update(
            { 
                item_peguei_emprestado, 
                contato_celular_devolucao, 
                contato_email_devolucao, 
                data_emprestimo, 
                data_devolucao, 
                resultado_devolucao
            }, 
                { where: { id }}
            )
            .then(() => {
                return res.status(200).json(modEmp);
            })
            .catch((err) => {
                console.log("Error to update loan: ", err);
            })
    },

    //Deletar Emprestimo
    delete: async (req, res) => {
        const { id } = req.params;
        const delEmp = await Cedidos().destroy({ where: { id } })
            .then(() => {
                return res.status(200).json(delEmp);
            })
            .catch((err) => {
                console.log("Error to delete loan: ", err);
            })
    }
}

module.exports = cedidosControllers;