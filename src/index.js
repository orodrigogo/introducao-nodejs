const express = require('express'); 
const server = express();
server.use(express.json());

/* INJERTANDO UM EXEMPLO DE MIDDLEWARE GLOBAL */
const getRequest = require('./middlewares/getRequest');
server.use(getRequest);


/* IMPORTAÇÃO DOS CONTROLLERS */
const HomeController = require('./controller/HomeController');
const TaskController = require('./controller/TaskController');
const UserController = require('./controller/UserController');



/* ROTAS PARA TASKS */
server.get('/', HomeController.Wellcome);


server.post('/task', TaskController.Register);

const auth = require('./middlewares/auth');
server.get('/task', auth, TaskController.TasksList); // INJETANDO UM MIDDLEWARE NA ROTA ESPECIFICA. 

server.get('/task/:id', TaskController.TaskDetails);
server.delete('/task/:id', TaskController.TaskDelete);
server.put('/task/:id', TaskController.Update);
server.put('/task/state/:id', TaskController.AlterState);



/* ROTAS PARA USUÁRIO */
server.post('/user', UserController.SignUp);
server.post('/user/auth', UserController.LognIn);


//Definindo a porta que a API irá atender as requisições.
server.listen(3000);