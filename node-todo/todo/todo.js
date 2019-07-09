
const express = require('express');
const router = express.Router();
const todoService = require('../service/todoService')
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
    todoService.addTodo(todo, req.user.id);
    var result = { // create an object for the response
        message: "success",
        id: todo.id
    }
    res.send(result)
});

router.get('/', function(req, res){
    res.send(todoService.getUserTodos(req.user.id));
});

router.put('/', function(req, res){
    var todo = req.body;
    var index = todoService.updateTodo(todo, req.user.id);
    if (index == -1){
        var result = {
            message: "Sorry, we din't find the todo with id "+todo.id
        }
        res.send(result);
        return;
    }
    var result = {
        message: "success"
    }
    res.send(result);
});

router.delete('/:id', function(req, res){
    console.log(req.params)
    var id = req.params.id;
    var index = todoService.deleteTodo(id);
    if (index == -1){
        var result = {
            message: "Sorry, we din't find the todo with id "+id
        }
        res.send(result);
        return;
    }
    var result = {
        message: "success"
    }
    res.send(result);
});