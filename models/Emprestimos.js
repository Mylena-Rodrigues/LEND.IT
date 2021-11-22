const config = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(config);
module.exports = () => {
    const Emprestimos = sequelize.define(
        'Emprestimos', {
            item_emprestado: DataTypes.STRING,
            contato_celular_devolucao: DataTypes.STRING,
            contato_celular_devolucao: DataTypes.STRING,
            data_emprestimo: DataTypes.DATE,
            data_devolucao: DataTypes.DATE,
            resultado_devolucao: DataTypes.BOOLEAN
        }, {
            tableName: "emprestados",
            timestamps: false
        }
    );

    //Associação de foreign Key
    Emprestimos.associate = (models) => {
        Emprestimos.belongsTo(models.Usuarios, {as: "emprestimo", foreignKey: "id_usuario_donoObj"});
    }

    return Emprestimos;
}