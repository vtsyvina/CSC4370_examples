const bcrypt = require('bcryptjs');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://root:1qaz2WSX@test-cluster-wcndy.mongodb.net/todo?retryWrites=true&w=majority";


/**
 * The service is responsible for working with user entities
 */
var service = {
    findUser: function (email, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            var myquery = { email: email };
            dbo.collection("users").findOne(myquery, function (err, user) {
                if (err) {
                    callback(null);
                    return;
                }
                callback(user);
                db.close();
            });
        });
    },

    registerUser: function (user, callback) {
        // check that all fields are present
        if (!user.name || !user.email || !user.password || !user.password2) {
            callback(undefined);
            return;
        }
        // check that the user with given email does not exist
        this.findUser(user.email, (foundUser) => {
            if (foundUser) {
                callback(undefined);
                return
            }
            // create a password with a salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    delete user.password2;
                    user.level = 'user';
                    MongoClient.connect(url, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("todo");
                        // MongoDB creates a unique id for each object itself,
                        // but we are tied to the model with integer id(so the service implementation
                        // can be changed at any moment), so we use additional table that will store the ids for new entries
                        // it is not a good practice, but we need to use it thanks to 'legacy' implementation
                        dbo.collection("counters").findOneAndUpdate({ _id: "userId" }, { $inc: { c: 1 } }, (err, res) => {
                            if (err) {
                                callback();
                                return;
                            }
                            user.id = res.value.c;
                            dbo.collection('users').insertOne(user, (err, res) => {
                                if (err) {
                                    callback();
                                    return;
                                }
                                callback(user.id);
                            })
                        });
                    })
                });
            });
        })
    },

    getUsers: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("todo");
            dbo.collection("users").find({}).toArray( function (err, users) {
                if (err) {
                    callback(null);
                    return;
                }
                callback(users);
                db.close();
            });
        });
    }
}

module.exports = service;