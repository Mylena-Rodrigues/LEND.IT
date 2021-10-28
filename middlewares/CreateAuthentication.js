const Usuarios  = require('../models/Usuarios')

module.exports = async (request, response, next) => {

    let { email, senha, nome  } = request.body;

    const emailDefault = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;
    
    if(nome && email && senha) {
        let users = await Usuarios().findAll({ where: { email} });
        if (!users.length) {
            if( senha.length >= 6 && senha.length <= 12){
                if (nome.length >= 2) {
                        if (senha == confirmation) {
                            if (emailDefault.test(email)) {
                                next();  
                            } else {
                                response.status(400).json({ erro: ' Verifique se o e-mail está correto. '});
                            }                   
                        } else {
                            response.status(400).json({ erro: ' Senhas não coincidem. '});
                        }
                } else {
                    response.status(400).json({ erro: ' O nome deve ter 2 letras ou mais. '});
                }
            } else {
                response.status(400).json({ erro: 'A senha deve ter entre 6 à 12 caracteres.'});
            }
            
        } else {
            response.status(400).json({ erro: 'Email já cadastrado.'});
        }
    } else {
        response.status(400).json({ erro: 'Preencha todos os campos.'});
    }
}