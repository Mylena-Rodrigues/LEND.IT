const config = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config);
module.exports = () => {
  const Cedidos = sequelize.define(
    "Cedidos",
    {
      item_emprestado: DataTypes.STRING,
      id_usuario_n_donoObj: {
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        allowNull: false,
      },
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
      as: "peguei_emprestado",
      foreignKey: "id_usuario_n_donoObj",
    });
  };

  return Cedidos;
};
