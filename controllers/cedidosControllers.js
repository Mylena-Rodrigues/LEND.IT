const Cedidos = require("../models/Cedidos");
const moment = require("moment");

const cedidosControllers = {
  //Listar Cedidos
  index: async (req, res) => {
    const listCedidos = await Cedidos()
      .findAll()
      .then(() => {
        return res.status(200).json(listCedidos);
      })
      .catch((err) => {
        console.log("Error to list loans: ", err);
      });
  },

  //Listar Cedidos de um usuário especifico
  userLoanList: async (req, res) => {
    const { id } = req.body;
    const listCedidos = await Cedidos()
      .findAll({ where: { id_usuario_n_donoObj: id } })
      .then((listCedidos) => {
        const newListCedidos = listCedidos.filter((emp) => {
          return emp.resultado_devolucao < 1;
        })
        return res.status(200).json(newListCedidos);
      })
      .catch((err) => {
        console.log("Error to list user loans: ", err);
      });
  },
  
  //Criar emprestimo
  create: async (req, res) => {
    const {
      id_usuario_n_donoObj,
      item_emprestado,
      nome_donoObj,
      contato_celular_devolucao,
      contato_email_devolucao,
      data_emprestimo,
      data_devolucao,
      resultado_devolucao,
    } = req.body;

    const novoEmp = await Cedidos()
      .create({
        id_usuario_n_donoObj,
        item_emprestado,
        nome_donoObj,
        contato_celular_devolucao,
        contato_email_devolucao,
        data_emprestimo,
        data_devolucao,
        resultado_devolucao
      })
      .then((novoEmp) => {
        return res.status(200).json(novoEmp);
      })
      .catch((err) => {
        console.log("Error to create loan: ", err)
      });
  },

  //Atualizar Emprestimo
  update: async (req, res) => {
    const {
      id,
      item_emprestado,
      nome_donoObj,
      contato_celular_devolucao,
      contato_email_devolucao,
      data_emprestimo,
      data_devolucao
    } = req.body;
    console.log(nome_donoObj)
    const modEmp = await Cedidos()
      .update(
        {
          item_emprestado,
          nome_donoObj,
          contato_celular_devolucao,
          contato_email_devolucao,
          data_emprestimo,
          data_devolucao
        },
        { where: { id } }
      )
      .then((modEmp) => {
        return res.status(200).json(modEmp);
      })
      .catch((err) => {
        console.log("Error to update loan: ", err);
      });
  },

  //Devolvendo objetos
  giveBack: async (req, res) => {
    const {id} = req.body;
    const data_devolucao = new Date().toISOString();
    const resultado_devolucao = true;
    const modEmp = await Cedidos()
      .update(
        {
          data_devolucao,
          resultado_devolucao
        },
        { where: { id } }
      )
      .then((modEmp) => {
        return res.status(200).json(modEmp);
      })
      .catch((err) => {
        console.log("Error to update loan: ", err);
      });
  },

  //Deletar Emprestimo
  delete: async (req, res) => {
    const { id } = req.body;
    console.log(">>>>>>>>>", id);
    const delEmp = await Cedidos()
      .destroy({ where: {id} })
      .then((delEmp) => {
        return res.status(200).json(delEmp);
      })
      .catch((err) => {
        console.log("Error to delete loan: ", err);
      });
  },
};

module.exports = cedidosControllers;
