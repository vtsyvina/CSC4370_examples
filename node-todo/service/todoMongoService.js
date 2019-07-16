var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://root:1qaz2WSX@test-cluster-wcndy.mongodb.net/todo?retryWrites=true&w=majority";

var service = {
    addTodo: function (todo, userid, callback) {
        todo.userid = userid;
        if (!todo.tasks) {
            todo.tasks = [];
        }

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            dbo.collection("counters").findOneAndUpdate({ _id: "todoId" }, { $inc: { c: 1 } }, (err, res) => {
                if (err) {
                    callback();
                    return;
                }
                todo.id = res.value.c;
                dbo.collection('todo').insertOne(todo, (err, res) => {
                    if (err) {
                        callback();
                        return;
                    }
                    callback(todo.id);
                })
            });
        })
    },

    updateTodo: function (todo, userid, callback) {
        todo.userid = userid;
        var myquery = { id: todo.id };
        var newvalues = { $set: todo };
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            dbo.collection("todo").updateOne(myquery, newvalues, function (err, res) {
                if (err) {
                    callback(err);
                    return;
                }
                callback()
                db.close();
            });
        });
    },

    deleteTodo: function (id, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            var myquery = { id: parseInt(id) };
            dbo.collection("todo").deleteOne(myquery, function (err, obj) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
                db.close();
            });
        });
    },

    /**
     * Gets all todos for a specific user
     */
    getUserTodos: function (userid, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            var myquery = { userid: userid };
            dbo.collection("todo").find(myquery).toArray(function (err, todos) {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, todos);
                db.close();
            });
        });
    },

    getTodoById(id, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            var myquery = { id: id };
            dbo.collection("todo").findOne(myquery, function (err, todo) {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, todo);
                db.close();
            });
        });
    }
}

module.exports = service;