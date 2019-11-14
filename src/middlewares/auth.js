//Váriavel simulando usuário logado.
const logged = true;

const auth = function(req, res, next){
  if(!logged){
    return res.status(401).json({error: 'Somente usuários logados podem acessar essa rota. Faça o login!'});
  }

  return next();
}

module.exports = auth;