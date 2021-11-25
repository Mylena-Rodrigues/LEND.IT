const Usuarios = require("../models/Usuarios");

module.exports = async (request, response, next) => {
  let { email, name, password, password_confirmation } = request.body;

  const emailDefault =
    /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

  if (email && name && password && password_confirmation) {
    let users = await Usuarios().findAll({ where: { email } });
    if (!users.length) {
      if (password.length >= 6 && password.length <= 12) {
        if (name.length >= 2) {
          if (password == password_confirmation) {
            if (emailDefault.test(email)) {
              next();
            } else {
              return response
                .status(400)
                .json({ message: " Verifique se o e-mail está correto. " });
            }
          } else {
            return response
              .status(400)
              .json({
                message:
                  " Senhas não coincidem >>>" +
                  password +
                  password_confirmation,
              });
          }
        } else {
          return response
            .status(400)
            .json({ message: " O nome deve ter 2 letras ou mais. " });
        }
      } else {
        return response
          .status(400)
          .json({ message: "A senha deve ter entre 6 à 12 caracteres." });
      }
    } else {
      console.log("Email já cadastrado.");
      return response.status(400).json({ message: "Email já cadastrado." });
    }
  } else {
    return response
      .status(400)
      .json({
        message:
          "Preencha todos os campos>>" +
          email +
          password +
          name +
          password_confirmation,
      });
  }
};
