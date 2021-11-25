const config = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config);
module.exports = () => {
  const Usuarios = sequelize.define(
    "Usuarios",
    {
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      nome: DataTypes.STRING,
    },
    {
      tableName: "usuarios",
      timestamps: false,
    }
  );
  //Associação de foreign keys
  Usuarios.associate = (models) => {
    //Usuario possui muitos empréstimos, identificação através da chave estrangeira apelidada de "emprestimo"
    Usuarios.hasMany(models.Emprestimos, {
      as: "emprestimo",
      foreignKey: "id_usuario_donoObj",
    });
    Usuarios.hasMany(models.Cedidos, {
      as: "peguei_emprestado",
      foreignKey: "id_usuario_n_donoObj",
    });
  };

  return Usuarios;
};
