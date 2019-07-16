
var MongoClient = require('mongodb').MongoClient;

module.exports = function (callback) {
    console.log("Start Mongo DB init");
    var url = "mongodb+srv://root:1qaz2WSX@test-cluster-wcndy.mongodb.net/todo?retryWrites=true&w=majority";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("todo");

        dbo.createCollection("users", function (err, res) {
            if (err) throw err;
            console.log("Users Collection created!");
        });
        dbo.createCollection("todo", function (err, res) {
            if (err) throw err;
            console.log("Todo Collection created!");
        });
        dbo.createCollection("counters", function (err, res) {
            if (err) throw err;
            dbo.collection("counters").stats().then( s =>{
                if (s.count == 0){
                    dbo.collection("counters").insertOne({ _id: "userId", c: 0 });
                    dbo.collection("counters").insertOne({ _id: "todoId", c: 0 });
                }
                callback()
            })
            
        });

    });
}