const Usuarios = require ('../models/Usuarios');
const bcrypt = require ('bcrypt');
const querystring = require('querystring');
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

    //Autenticar usuario - Login
    auth: async (req, res) => {
            const { email, password } = req.body;
    
            const usuario = await Usuarios().findOne({where: { email: email }}); 
            
            if (!usuario) {
                return res.status(404).json({message: 'user not found.'});
            } else if (bcrypt.compareSync(password, user.senha)) {
                req.session.usuarioLogado = usuario;
                const { id } = req.session.usuarioLogado;
                return res.redirect('/emprestimos/user=?' + id);
            } else {
                const data = { 'erro': 'Credenciais incorretas.' };
                return res.redirect('/' + querystring.stringify(data));
            }
    },

    //Lougout
    logout: async (req, res) => {
        req.session.usuarioLogado = null;
        return res.redirect("/");
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
        const { id } = req.session.usuarioLogado;
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