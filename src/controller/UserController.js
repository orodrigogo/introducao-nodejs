const mongo = require('../config/database');
const bcrypt = require('bcrypt');


class UserController {

  async SignUp(req, res) {
    const { name,  email,  password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Os campos name, email e password são obrigatórios!"});
    }

    await mongo.collection('users').findOne({email}).then(result => {
        if (result) {
          res.status(500).json({ error: 'Este email já está cadastrado!' });    
        }
      })

    await mongo.collection('users').insert({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    }).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(500).json(error.message);
    })
  }

  async LognIn(req, res){
    const { email,  password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Os campos email e password são obrigatórios!"});
    }

    await mongo.collection('users').findOne({email}, async function(error, data){
      if(!data)
      res.status(404).json({ error: "Usuário não encontrado!"});

      const pass_ok = await bcrypt.compare(password, data.password);

      if(!pass_ok)
      res.status(500).json({ error: "Senha Inválida!"});

      res.status(200).json({ message: "LOGADO!"});
    })
  }


  }

  module.exports = new UserController();