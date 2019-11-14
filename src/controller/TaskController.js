const { mongo, ObjectId } = require('../config/database');

/*
  ### TIPOS DE PARAMETROS ###
  Query params = ?teste=1
  Route params = /teste/1
  Request body = { "nome" : "rodrigo"}
*/

class TaskController{
  Register(req, res){
    const { name, description, date, time, done, type } = req.body;

    /* CAMPOS OBRIGATÓRIO: name, description, date e hora */
    if(!name || !description || !date || !time){
      res.status(400).json({'error':'name, description, date e hora SÃO OBRIGATÓRIOS!'});
    }

    mongo.collection('task').insertOne({
      'name': name,
      'description': description,
      'date': date,
      'time': time,
      'done': done ? done : false, 
      'type': type ? type : "geral" 
    }).then(result => {
      res.status(200).json(result)
    }).catch(error => {
      res.status(400).json({'error': error.message})
    })    
  }

  TasksList(req, res){
    if(!req.query.done){
      res.status(400).json({'error': 'Done é obrigatório. True para atividades finalizadas e False para pendentes'});
    }

    mongo.collection('task').find({done: req.query.done === "true" ? true : false}).toArray().then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(400).json({'error': error.message});
    })
  }

  TaskDetails(req, res){
    const { id } = req.params;

    mongo.collection('task').findOne({_id: ObjectId(id)}).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(400).json({'error': error.message});
    })
  }

  TaskDelete(req, res){
    const { id } = req.params;

    mongo.collection('task').deleteOne({_id: ObjectId(id)}).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(400).json({'error': error.message});
    })
  
  }

  Update(req, res){
    const { name, description, date, time, done, type } = req.body;
    const { id } = req.params;

    /* CAMPOS OBRIGATÓRIO: name, description, date e hora */
    if(!name || !description || !date || !time){
      res.status(400).json({'error':'name, description, date e hora SÃO OBRIGATÓRIOS!'});
    }

    mongo.collection('task').updateOne({_id: ObjectId(id)}, {$set: {
      'name': name,
      'description': description,
      'date': date,
      'time': time,
      'done': done ? done : false, 
      'type': type ? type : "geral" 
    }}).then(result => {
      res.status(200).json(result)
    }).catch(error => {
      res.status(400).json({'error': error.message})
    })    
  }

  AlterState(req, res){
    const { id } = req.params;

    // Buscando pela tarefa.
      mongo.collection('task').findOne({_id: ObjectId(id)}).then(async result => {
      if(!result)
      res.status(404).json({error: "Tarefa não existe!"})

      await mongo.collection('task').updateOne({_id: ObjectId(id)}, {$set: {'done': !result.done }}).then( task => {
        res.status(200).json({message: `Tarefa atualizada para ${!result.done ? 'finalizada' : 'pendente'}`})
      })
    }).catch(error => {
      res.status(200).json(response)
    })
  }
}

module.exports = new TaskController();