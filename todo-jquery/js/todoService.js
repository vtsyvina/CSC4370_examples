/*
*   Service is responsible for sending request to the server for CRUD operations
*   with todos objects
*/
var todoService = {};
var id = 0;
todoService.addTodo = function (todo, callback){
    // create request
    callback("success", id++);
}

todoService.deleteTodo = function (id, callback){
    // delete request
    callback("success");
}

todoService.updateTodo = function (todo, callback){
    // update request
    callback("success")
}