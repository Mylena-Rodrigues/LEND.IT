module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define(
        'Usuarios', {
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            nome: DataTypes.STRING
        }, {
            tableName: "usuario",
            timestamps: false
        }
    );
        //Associação de foreign keys
        Usuarios.associate = (models) => {
            //Usuario possui muitos empréstimos, identificação através da chave estrangeira apelidada de "emprestimo"
            Usuarios.hasMany (models.Emprestimos, {as: "emprestimo", foreignKey:"id_usuario_donoObj"});
        }


    return Usuarios;
}