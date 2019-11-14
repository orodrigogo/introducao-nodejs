const getRequest = function(req, res, next){
  console.time('Request');
  console.log(`Método: ${req.method} - URL: ${req.url};`);

  next();

  console.timeEnd('Request');
};

module.exports = getRequest;
