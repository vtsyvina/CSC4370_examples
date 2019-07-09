
var todos = [];
var id = 0;

var service = {
    addTodo: function (todo, userid) {
        todo.id = id++;
        todo.userid = userid;
        todos.push(todo);
    },

    updateTodo: function (todo, userid) {
        var index = todos.findIndex(t => t.id == todo.id);
        if (index == -1) {
            return index;
        }
        todo.userid = userid;
        todos[index] = todo;
        return index
    },

    deleteTodo: function (id) {
        var index = todos.findIndex(t => t.id == id);
        if (index == -1) {
            return index;
        }
        todos.splice(index, 1);
        return index;
    },

    getUserTodos: function (userid) {
        return todos.filter(t => t.userid == userid)
    }
}

module.exports = service;