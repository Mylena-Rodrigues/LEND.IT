const Usuarios = require ('../models/Usuarios');
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
    //Listar usuário específico
    findOne: async (req, res) => {
        const {id} = req.body;
        const usuario = await Usuarios().findOne({where: {id: id}})
        .then((usuario) => {
            return res.status(200).json(usuario);
        })
        .catch((err) =>{
            console.log("Error to list user: ", err);
        })  
    },

    //Autenticar usuario - Login
    auth: async (req, res) => {
            const { email, password } = req.body;
    
            const usuario = await Usuarios().findOne({where: { email: email }}); 
            console.log(usuario);
            if (!usuario) {
                return res.status(404).json({message: 'user not found.'});
            } else if (bcrypt.compareSync(password, usuario.senha)) { 
                return res.status(200).json(usuario);
            } else {
                return res.status(400).json({message: 'Incorrect credencials'});
            }
    },

    //Criar usuário
    create: async (req, res) => {
        const {email, name, password } = req.body;
        //Encriptação de senha
        const senhaEncript = bcrypt.hashSync(password, 14);
        //Criação do novo usuário
        const novoUsuario = await Usuarios().create({email: email, nome: name, senha: senhaEncript })
        .then((novoUsuario) => {
            console.log(novoUsuario);
        })
        .catch((err) =>{
            console.log("Error to create user: ", err);
        })
        return res.json(novoUsuario);   
    },

    //Atualizar usuário
    updateName: async (req, res) => {
        const { id, nome } = req.body;
        console.log(id, nome)
        const modUser = await Usuarios().update({nome}, {where: {id}})
        .then((modUser) => {
            return res.status(200).json(modUser); 
        })
        .catch((err) =>{
            console.log("Error to update user: ", err);
        })
          
    },

    updateEmail: async (req, res) => {
        const {id, email} = req.body;
        const modUsuario = await Usuarios().update({email}, {where: {id: id}})
        .then((modUsuario) => {
            res.status(200).json(modUsuario);
        })
        .catch((err) =>{
            console.log("Error to update user: ", err);
        })   
    },


    updatePassword: async (req, res) => {
        const {id, senha } = req.body;
        const senhaEncript = bcrypt.hashSync(senha, 14);
        const modUsuario = await Usuarios().update({senha: senhaEncript}, {where: {id}})
        .then(() => {
            return res.status(200).json(modUsuario); 
        })
        .catch((err) =>{
            console.log("Error to update user: ", err);
        })
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