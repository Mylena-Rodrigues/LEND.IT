const Emprestimos = require("../models/Emprestimos");
const moment = require("moment");

const emprestimosControllers = {
  //Listar Emprestimos
  index: async (req, res) => {
    const listEmprestimos = await Emprestimos()
      .findAll()
      .then(() => {
        return res.status(200).json(listEmprestimos);
      })
      .catch((err) => {
        console.log("Error to list loans: ", err);
      });
  },

  //Listar Emprestimos de um usuário especifico
  userLentList: async (req, res) => {
    const { id } = req.body;
    const listEmprestimos = await Emprestimos()
      .findAll({ where: { id_usuario_donoObj: id }})
      .then((listEmprestimos) => {

        const newListEmprestimos = listEmprestimos.filter((emp) => {
          return emp.resultado_devolucao < 1;
        })
        return res.status(200).json(newListEmprestimos);
      })
      .catch((err) => {
        console.log("Error to list user loans: ", err);
      });
  },

  //Criar emprestimo
  create: async (req, res) => {
    const {
      id_usuario_donoObj,
      item_emprestado,
      nome_responsavel_atual,
      contato_celular_devolucao,
      contato_email_devolucao,
      data_emprestimo,
      data_devolucao,
      resultado_devolucao
    } = req.body;
    const novoEmp = await Emprestimos()
      .create({
        id_usuario_donoObj,
        item_emprestado,
        nome_responsavel_atual,
        contato_celular_devolucao,
        contato_email_devolucao,
        data_emprestimo,
        data_devolucao,
        resultado_devolucao,
      })
      .then((novoEmp) => {
        return res.status(200).json(novoEmp);
      })
      .catch((err) => {
       console.log("Error to create loan: ", err);
      });
  },

  //Atualizar Emprestimo
  update: async (req, res) => {
    const {
      id,
      item_emprestado,
      nome_responsavel_atual,
      contato_celular_devolucao,
      contato_email_devolucao,
      data_emprestimo,
      data_devolucao
    } = req.body;
    const modEmp = await Emprestimos()
      .update(
        {
          item_emprestado,
          nome_responsavel_atual,
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
    const modEmp = await Emprestimos()
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
    const delEmp = await Emprestimos()
      .destroy({ where: {id} })
      .then((delEmp) => {
        return res.status(200).json(delEmp);
      })
      .catch((err) => {
        console.log("Error to delete loan: ", err);
      });
  },
};

module.exports = emprestimosControllers;
