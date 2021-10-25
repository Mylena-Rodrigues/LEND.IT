const { Usuarios , sequelize } = require ('../models/');

const usuariosControllers = {
    index: async (req, res) => {
        const listUsuarios = await Usuarios.findAll();
        console.log(listUsuarios);
        return res.json(listUsuarios);   
    }
}

module.exports = usuariosControllers;