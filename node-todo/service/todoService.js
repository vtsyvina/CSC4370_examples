
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/todo-db.db');

var service = {
    addTodo: function (todo, userid, callback) {
        todo.userid = userid;
        if (!todo.tasks){
            todo.tasks = [];
        }
        /**
         * Adds todo into two steps:
         * - add todo into todo table
         * - add tasks into task table with the id from the previous step
         * 
         * What can be an issue in this method with these two steps?
         */
        db.run(`INSERT INTO todo(title, description, date, userid) 
            VALUES($title, $description, $date, $userid)`, {
                $title: todo.title,
                $description: todo.description,
                $date: todo.date,
                $userid: todo.userid
            }, function (err) {
                if (err) {
                    console.log(err);
                    callback();
                    return;
                }
                // this.lastID contains id of inserted todo
                if(todo.tasks.length == 0){
                    callback(this.lastID)
                    return;
                }

                var taskInserSql = `INSERT INTO task (description, todoid) VALUES`
                var parameters = {}
                for(var i = 0; i < todo.tasks.length; i++){
                    taskInserSql += '($'+i+'description,$todoid),';
                    parameters['$'+i+'description'] = todo.tasks[i].description
                }
                
                //remove last comma
                taskInserSql = taskInserSql.substr(0, taskInserSql.length-1);
                var lastID = this.lastID;
                parameters.$todoid = lastID;
                
                db.run(taskInserSql, parameters, function(err) {
                    console.log("Insert todo db:");
                    console.log(this);
                    // why can't we user this.lastId here?
                    callback(lastID)
                })
                
            })
    },

    updateTodo: function (todo, userid, callback) {
        todo.userid = userid;
        db.run(`UPDATE todo
            SET title=$title, description=$description, date=$date, userid=$userid
            WHERE id=$id`, {
                $id: todo.id,
                $title: todo.title,
                $description: todo.description,
                $date: todo.date,
                $userid: todo.userid
            }, function (err) {
                if (err) {
                    console.log(err);
                    callback(err);
                    return;
                }
                console.log("UPDATE todo db:");
                console.log(this);
                callback()
            })
    },

    deleteTodo: function (id, callback) {
        var id = parseInt(id);
        //exec doesn't allow to pass parameters
        if (isNaN(id)){
            callback("Not a number");
            return
        }
        // delete from both todo and task table. perform two queries
        db.exec(`DELETE FROM todo
            WHERE id=`+id+`;
            DELETE FROM task
            WHERE todoid=`+id, function (err) {
                if (err) {
                    console.log(err);
                    callback(err);
                    return;
                }
                console.log("DELETE todo db:");
                console.log(this);
                callback()
            })
    },

    /**
     * Gets all todos for a specific user
     */
    getUserTodos: function (userid, callback) {
        // save into variable because of the scope reasons
        var convert = this.convertRowsIntoTodo;
        // select todos with joined tasks
        db.all(`SELECT todo.id todo_id, todo.title todo_title, todo.description todo_description,
        todo.date todo_date, task.id task_id, task.description task_description FROM todo 
        LEFT JOIN task on task.todoid=todo.id
        WHERE userid=$id`, { $id: userid}, function (err, rows) {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }
            console.log("GET user todos db:");
            console.log(this);
            // we need to convert rows into todos, since several rows may represent one todo
            var todos = [];
            if (rows.length == 0){
                callback(null, todos);
                return;
            }
            var start = 0;
            for(var i=0; i< rows.length; i++){
                // we find the start and the end of rows representing one todo
                if (rows[i].todo_id != rows[start].todo_id){
                    todos.push(convert(rows.slice(start, i)));
                    start = i;
                }
                // don't forget to push the last one
                if (i == rows.length-1){
                    todos.push(convert(rows.slice(start, rows.length)));
                }
            }
            console.log(rows);
            callback(null, todos)
        })
    },

    getTodoById(id, callback){
        // works similar to get all todos
        var convert = this.convertRowsIntoTodo;
        db.all(`SELECT todo.id todo_id, todo.title todo_title, todo.description todo_description,
        todo.date date, task.id task_id, task.description task_description FROM todo 
        LEFT JOIN task on task.todoid=todo.id
        WHERE todo.id=$id`, { $id: id}, function (err, rows) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            console.log("GET todo db:");
            console.log(this);
            var todo = {};
            if (rows.length == 0){
                callback(null, todo);
                return;
            }
            
            console.log(rows);
            callback(null, convert(rows))
        })
    },

    /**
     * Takes a set of rows that represent one todo(we can have several tasks)
     * And converts them into javascript Todo object
     */
    convertRowsIntoTodo: function(rows){
        var todo = {
            id: rows[0].todo_id,
            title: rows[0].todo_title,
            description: rows[0].todo_description,
            date: rows[0].todo_date,
            tasks:[]
        };
        for (var i=0; i < rows.length; i++){
            if (rows[i].task_id){
                todo.tasks.push({
                    id: rows[i].task_id,
                    description: rows[i].task_description
                })
            }
        }
        return todo;
    }
}

module.exports = service;