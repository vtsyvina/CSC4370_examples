// show the panel with inputs to create a todo
function showTodoInputPanel(){
    $(".add-todo-container").toggle();
}

/**
 * Collects input fields from add todo panel, send the request to add Todo
 * Adds todo's card to the page in case of success
 */
function addTodo(){
    console.log("add todo")
    var todo = {
        title: $("#todo-title-input").val(),
        description: $("#todo-description-textarea").val(),
        date: new Date()
    }

    todoService.addTodo(todo, function(data, status){
        if (data.message != "success"){
            showErrorMessage("Sorry, it was an error while adding new todo");
            return;
        }
        $("#todo-title-input").val("");
        $("#todo-description-textarea").val("");
        todo.id = data.id;
        showCreatedTodo(todo);
        $(".add-todo-container").hide()
    })
}

/**
 * Adds todo object to the HTML
 * @param {object} todo Todo object to add to the page
 */
function showCreatedTodo(todo){

    var elem = $("<div></div>");
    elem.addClass("col-lg-3 col-md-4");
    elem.html(getTodoCardHTML(todo));
    elem.attr("id", "todo-card-"+todo.id);
    $(".todo-container").append(elem);
    $("button.delete-todo-button[data-todo-id='"+todo.id+"']").click(todo.id, deleteTodo)
    $("button.update-todo-button-card[data-todo-id='"+todo.id+"']").click(todo, showUpdateTodo)
}

function getTodoCardHTML(todo){
    var closeButton = '<button data-todo-id="'+todo.id+'" type="button" class="close delete-todo-button" aria-label="Close">'
    +'<span aria-hidden="true">&times;</span>'
  +'</button>';
    var updateButton = '<button data-todo-id="'+todo.id+'" type="button" class="close update-todo-button-card" aria-label="Close">'
    +'<span aria-hidden="true">U</span>'
  +'</button>';
  return "<div class=\"todo-card\">"+updateButton+closeButton+"<h4>"+todo.title+"</h4>"+"<p>"
    +todo.description+"</p><p>"
    +formatDate(todo.date)+"</p></div>"

}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function formatDate(date){
    return isValidDate(date) ? date.getHours()+":"+date.getMinutes()+" "+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear() : "";
}

/**
 * Removes todo from the page and calls todoService to send delete request
 * @param {event} event click on close button event
 */
function deleteTodo(event){
    todoService.deleteTodo(event.data, function(data, status){
        if (data.message != "success"){
            showErrorMessage("Sorry, it was an error while deleting the todo")
            return;
        }
        $("#todo-card-"+event.data).remove();
    })
}

function showUpdateTodo(event){
    var todo = event.data
    $(".update-todo-container").show();
    $("#update-todo-title-input").val(todo.title);
    $("#update-todo-description-textarea").val(todo.description);
    $("#update-todo-id-input").val(todo.id)
}

/**
 * Collects data from update panel, send request through service
 * and update the card in case of success
 */
function updateTodo(){
    var todo = {
        id: parseInt($("#update-todo-id-input").val()),
        title: $("#update-todo-title-input").val(),
        description: $("#update-todo-description-textarea").val(),
        date: new Date()
    }
    todoService.updateTodo(todo, function(data, status) {
        if (data.message != "success"){
            showErrorMessage("Sorry, it was an error while updating the todo");
            return;
        }
        $("#todo-card-"+todo.id).html(getTodoCardHTML(todo));
        $("button.delete-todo-button[data-todo-id='"+todo.id+"']").click(todo.id, deleteTodo)
        $("button.update-todo-button-card[data-todo-id='"+todo.id+"']").click(todo, showUpdateTodo)
        $(".update-todo-container").hide();
    })
}

/**
 * Shows the given error message for 3 seconds 
 * in case somethings goes wrong
 * @param {string} message Message or the error to display
 */
function showErrorMessage(message){
    $(".failed-todo").html(message);
    $(".failed-todo").show();
    setTimeout( function(){
        $(".failed-todo").hide();
    }, 3000);
}

/**
 * Puts click hanglers on page load
 */
$(document).ready(function(){
    console.log("init")
    $(".add-todo-button-menu").click(showTodoInputPanel);
    $(".add-todo-button").click(addTodo);
    $(".delete-todo-button").click(deleteTodo);
    $(".update-todo-button").click(updateTodo);
    // loads the list of todos on start of the page
    todoService.getTodos(function(data, status){
        var todos = data;
        for(var i=0; i<todos.length; i++){
            // in response we have timestamp in 'date' property
            // so we need to convert it into the Date object
            todos[i].date = new Date(todos[i].date);
            showCreatedTodo(todos[i])
        }
    })
    // remember how 'let' works
    // for (let i=0; i< 5; i++){
    //     var button = document.createElement("button");
    //     button.innerText = "Button "+i;
    //     $("footer").append(button);
    //     button.onclick  = function(){
    //         console.log("Button click "+i);
    //     }
    // }
});

function myFunction(a){
    var b = 2*a;
    return b*b;
}
var x = myFunction(5);