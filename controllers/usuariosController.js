const Usuarios = require ('../models/Usuarios');
const { Aunthentic } = require ('../middlewares/')
const bcrypt = require ('bcrypt');
//Controllers de Usuario
const usuariosControllers = {

    //Listar usuários
    index: async (req, res) => {
        const listUsuarios = await Usuarios().findAll()
        .then((listUsuarios) => {
            console.log(listUsuarios);
        })
        .catch((err) =>{
            console.log("Error to list users: ", err);
        })
        return res.json(listUsuarios);   
    },

    auth: async (req, res) => {
            const { login_email, login_senha } = req.body;
    
            const user = await Usuarios().findOne({where: { email: login_email }}); 
            if (user && bcrypt.compareSync(login_senha, user.senha)) {
                req.session.userLoged = user;
                return res.redirect('/'); 
            } else {
                return res.redirect('/usuarios/Login')
            }
    },

    //Criar usuário
    create: async (req, res) => {
        const {email, senha, nome } = req.body;
        //Encriptação de senha
        const senhaEncript = bcrypt.hashSync(senha, 14);
        //Criação do novo usuário
        const novoUsuario = await Usuarios().create({email, senha: senhaEncript, nome})
        .then((novoUsuario) => {
            console.log(novoUsuario);
        })
        .catch((err) =>{
            console.log("Error to create user: ", err);
        })
        return res.json(novoUsuario);   
    },

    //Atualizar usuário
    update: async (req, res) => {
        const {id} = req.params;
        const {email, senha, nome } = req.body;
        const senhaEncript = bcrypt.hashSync(senha, 14);
        const modUsuario = await Usuarios().update({email, senha: senhaEncript, nome}, {where: {id}})
        .then((modUsuario) => {
            console.log(modUsuario);
        })
        .catch((err) =>{
            console.log("Error to update user: ", err);
        })
        return res.send(modUsuario); 
    },

    //Deletar usuário
    delete: async (req,res) => {
        const{id} = req.params;
        const delUsuario = await Usuarios().destroy({where: {id}})
        .then((delUsuario) => {
            console.log(delUsuario);
        })
        .catch((err) =>{
            console.log("Error to delete user: ", err);
        })
        return res.json(delUsuario);
    }
}

module.exports = usuariosControllers;