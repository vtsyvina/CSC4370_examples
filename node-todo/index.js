var express = require('express');
var loginApi = require('./login/login');
var todoApi = require('./todo/todo');
var path = require('path');
var app = express()
const passport = require('passport');
const session = require('express-session');
const formidable = require('formidable');
const  {ensureAuthenticated}  = require('./config/auth');
const todoService = require('./service/todoService');
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

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);


require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// register out APIs from other files
app.use('/api/v1/users/', loginApi);
app.use('/api/v1/todo/', todoApi)

/**
 * Saves the file from request
 */
app.post('/api/v1/file', (req, res) => {
    console.log(req.body)
    var form = new formidable.IncomingForm();
  
    form.parse(req);

    var replaceAll = function(str, search, replacement) {
        var target = str;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
  
    form.on('fileBegin', function (name, file){
      file.path = __dirname + '/public/uploads/' + replaceAll(file.name, " ", "_");
    });
  
    form.on('file', function (name, file) {
      console.log('Uploaded ' + file.name);
    });
  
    res.send('{"status":"ok"}')
 });

 /**
  * Host everything in public folder as static content
  */
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

var initDB = require('./config/db_init');
// we need to start the server and listen to port 3000
var server = app.listen(3000, function(){
    console.log("Start listening at port 3000");
    initDB((res) =>{
      console.log("DB init finished with following errors:");
      console.log(res);
    });
})