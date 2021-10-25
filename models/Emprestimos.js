module.exports = (sequelize, DataTypes) => {
    const Emprestimos = sequelize.define(
        'Emprestimos', {
            item_emprestado: DataTypes.STRING,
            contato_devolucao: DataTypes.STRING,
            data_emprestimo: DataTypes.DATE,
            data_devolucao: DataTypes.DATE,
            resultado_devolucao: DataTypes.BOOLEAN
        }, {
            tableName: "emprestado",
            timestamps: true
        }
    );

    //Associação de foreign Key
    Emprestimos.associate = (models) => {
        Emprestimos.belongsTo(models.Usuarios, {as: "emprestimo", foreignKey: "id_usuario_donoObj"});
    }

    return Emprestimos;
}