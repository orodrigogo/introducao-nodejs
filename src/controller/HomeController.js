class HomeController{

  Wellcome(req, res){
    return res.status(200).send(`
        <h1 style="width: 100%; text-align: center; margin-top: 50px;">Bem vindo à API do aplicativo <span style="color: blue;">praFazer!</span></h1>
    `)
  }
}

module.exports = new HomeController();