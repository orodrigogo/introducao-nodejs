const express = require('express'); 
const server = express();
server.use(express.json());


/* IMPORTAÇÃO DOS CONTROLLERS */
const HomeController = require('./controller/HomeController');
const TaskController = require('./controller/TaskController');


/* ROTAS */
server.get('/', HomeController.Wellcome);

server.post('/task', TaskController.Register);
server.get('/task', TaskController.TasksList);
server.get('/task/:id', TaskController.TaskDetails);
server.delete('/task/:id', TaskController.TaskDelete);
server.put('/task/:id', TaskController.Update);
server.put('/task/state/:id', TaskController.AlterState);



//Definindo a porta que a API irá atender as requisições.
server.listen(3000);