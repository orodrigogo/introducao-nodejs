class HomeController{

  Wellcome(req, res){
    return res.status(200).send("Servidor Téc. Informática 35 ON!")
  }
}

module.exports = new HomeController();