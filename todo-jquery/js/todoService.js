/*
*   Service is responsible for sending request to the server for CRUD operations
*   with todos objects
*/
var todoService = {};

/**
 * Send GET request to get the list of all TODOs from the server
 */
todoService.getTodos = function(callback){
    $.ajax({
        type: "GET", // HTTP Method
        url: "http://localhost:3000/api/v1/todo", // URL
        success: callback, // function to call after the request is finished
        dataType: "json", // what we expect to get as response
    })
}

/**
 * Sends POST request to create new TODO 
 */
todoService.addTodo = function (todo, callback){
    var copy = Object.assign({}, todo); // we create the copy of the todo because we need to change one field
    copy.date = copy.date.getTime(); // instead of Date object we put just timestamp (convert new Date() -> 1561423118224)
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/v1/todo",
        data: JSON.stringify(copy), // we need to create a string out of object. Otherwise jQuery will send this data in "form" form instead of JSON 
        success: callback, 
        dataType: "json", // what we expect to get as response
        contentType: "application/json" // what we send in the body of the request
    })
}

/**
 * Sends DELETE request to delete TODO by its id
 * Commented out is standard ajax call using jQuery, fetch is an example of how to send the data using standard JS API
 * These two approaches are equal in this example
 */
todoService.deleteTodo = function (id, callback){
    // example of 
    // $.ajax({
    //     type: "DELETE",
    //     url: "http://localhost:3000/api/v1/todo/"+id,
    //     success: callback,
    //     dataType: "json",
    //     contentType: "application/json"
    // })
    fetch("http://localhost:3000/api/v1/todo/"+id, {
        method: "DELETE",
        dataType: "json",
        contentType : "application/json"
    }).then(res => res.json()).then( json => {
        console.log("We got the json");
        console.log(json);
        callback(json, 200)
    })
}

/**
 * Sends PUT request to update the TODO object
 */
todoService.updateTodo = function (todo, callback){
    var copy = Object.assign({}, todo);
    copy.date = copy.date.getTime();
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/api/v1/todo/",
        success: callback,
        data: JSON.stringify(copy),
        dataType: "json",
        contentType: "application/json"
    })
}