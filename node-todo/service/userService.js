const bcrypt = require('bcryptjs');
/**
 * The service is responsible for working with user entities
 */
var users = [
    { name: 'vtsivina',
  email: 'slava@gmail.com',
  password:
   '$2a$10$vAb0Fa10wm/1CSAEg.x99eOYXElDfTsjRnH3icjXQgQArTuV.G/ue',
  id: 0,
level: 'admin' }
]
var id = 1;
var service = {
    findUser: function(email){
        return users.find(u => u.email == email)
    },

    registerUser: function(user, callback){
        // check that all fields are present
        if (!user.name || !user.email || !user.password || !user.password2){
            callback(undefined);
            return;
        }
        // check that the user with given email does not exist
        var foundUser = users.find(u => u.email === user.email);
        if (foundUser){
            callback(undefined);
            return;
        }

        // create a password with a salt
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              delete user.password2;
              user.id = id++;
              user.level = 'user';
              users.push(user); // save user
              callback(user.id)
         });
        });
    },

    // get all users but remove password field from them
    getUsers: function(){
        return users.map(u =>{
            var copy = Object.assign({}, u);
            delete copy.password;
            return copy;
        })
    }
}

module.exports = service;