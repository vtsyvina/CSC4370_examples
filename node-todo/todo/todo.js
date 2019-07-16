
const express = require('express');
const router = express.Router();
const todoService = require('../service/todoService')
// const todoService = require('../service/todoMongoService')
const { ensureAuthenticated}  = require('../config/auth');
module.exports = router;

// all requests should be done by at least an authenticated user
router.all('/', ensureAuthenticated('user'))

/**
 * Start defining the API
 */
router.post('/', function(req, res){
    console.log("POST todo");
    console.log(req.body);
    var todo = req.body; // get TODO object from the request body
    var result = {};
    todoService.addTodo(todo, req.user.id, (id)=>{
        if (id){
            result = { // create an object for the response
                message: "success",
                id: id
            }
        } else{
            result = {
                message: "failed"
            }
        }
        res.send(result)
    });
    
});

router.get('/', function(req, res){
    todoService.getUserTodos(req.user.id, (err, todos) =>{
        if (err){
            res.send([])
        } else{
            res.send(todos)
        }
    });
});

router.get('/:id', function(req, res){
    todoService.getTodoById(req.params.id, (err, todo) =>{
        if (err){
            res.send({})
        } else{
            res.send( todo)
        }
    });
});

router.put('/', function(req, res){
    var todo = req.body;
    todoService.updateTodo(todo, req.user.id, (err) =>{
        if (err){
            res.send({message:'failed'})
        } else{
            res.send({message: 'success'})
        }
    });
});

router.delete('/:id', function(req, res){
    console.log(req.params)
    var id = req.params.id;
    todoService.deleteTodo(id, (err)=>{
        if (err){
            res.send({message:"failed"})
        } else{
            res.send({message:"success"})
        }
    });
});