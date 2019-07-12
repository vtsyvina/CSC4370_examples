var sqlite3 = require('sqlite3').verbose();

module.exports = function (callback) {
    console.log("Start DB init");
    var db = new sqlite3.Database('./db/todo-db.db');
    // it will run each query one by one
    db.serialize(()=>{
        console.log('users');
        // create users table
        db.run(`
            create table if not exists "users" (
                "name"	TEXT,
                "id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                "level"	TEXT,
                "email"	TEXT NOT NULL UNIQUE,
                "password"	TEXT NOT NULL
            );`);
        
        //create todo table
        db.run(`create table if not exists "todo" (
            "id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            "title"	TEXT NOT NULL,
            "description"	TEXT NOT NULL,
            "date"	INTEGER NOT NULL,
            "userid" INTEGER NOT NULL
        );`);
        
        // create task table
        db.run(`
            create table if not exists "task" (
                "id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                "description"	TEXT NOT NULL,
                "todoid"	INTEGER NOT NULL
            );
        `, (res)=>{
            console.log(res);
            callback(res)
        });
    });
}