const { Emprestimos , sequelize } = require ('../models/');

const emprestimosControllers = {
    index: async (req, res) => {
        const listEmprestimos = await Emprestimos.findAll();
        console.log(listEmprestimos);
        return res.json(listEmprestimos);   
    }
}

module.exports = emprestimosControllers;