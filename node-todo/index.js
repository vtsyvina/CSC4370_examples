var express = require('express');

var app = express()

/**
 * Add CORS headers for all requests
 * '*' - is a wildcard that stands for all possible routes
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, X-http-method-override");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); // we need to call it to pass control for other handlers
  });

// consider that all requests will send JSON in the body. This will parse the body and put the JSON so we can use it
app.use(express.json());


var todos = [];
var id = 0;
/**
 * Start defining the API
 */
app.post('/api/v1/todo', function(req, res){
    console.log("POST todo");
    console.log(req.body);
    var todo = req.body; // get TODO object from the request body
    todo.id = id++;
    todos.push(todo);
    var result = { // create an object for the response
        message: "success",
        id: todo.id
    }
    res.send(result)
});

app.get('/api/v1/todo', function(req, res){
    res.send(todos);
});

app.put('/api/v1/todo', function(req, res){
    var todo = req.body;
    var index = todos.findIndex(t => t.id == todo.id);
    if (index == -1){
        var result = {
            message: "Sorry, we din't find the todo with id "+todo.id
        }
        res.send(result);
        return;
    }
    todos[index] = todo;
    var result = {
        message: "success"
    }
    res.send(result);
});

app.delete('/api/v1/todo/:id', function(req, res){
    console.log(req.params)
    var id = req.params.id;
    var index = todos.findIndex(t => t.id == id);
    if (index == -1){
        var result = {
            message: "Sorry, we din't find the todo with id "+id
        }
        res.send(result);
        return;
    }
    todos.splice(index, 1);
    var result = {
        message: "success"
    }
    res.send(result);
})

// we ned to start the server and listen to port 3000
var server = app.listen(3000, function(){
    console.log("Start listening at port 3000");
})