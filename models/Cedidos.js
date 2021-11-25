const config = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config);
module.exports = () => {
  const Cedidos = sequelize.define(
    "Cedidos",
    {
      item_emprestado: DataTypes.STRING,
      nome_donoObj: DataTypes.STRING,
      contato_celular_devolucao: DataTypes.STRING,
      contato_email_devolucao: DataTypes.STRING,
      data_emprestimo: DataTypes.DATE,
      data_devolucao: DataTypes.DATE,
      resultado_devolucao: DataTypes.BOOLEAN,
    },
    {
      tableName: "cedidos",
      timestamps: false,
    }
  );

  //Associação de foreign Key
  Cedidos.associate = (models) => {
    Cedidos.belongsTo(models.Usuarios, {
      as: "emprestimo",
      foreignKey: "id_usuario_n_donoObj",
    });
  };

  return Cedidos;
};
