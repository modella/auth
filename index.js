/**
 * Module dependencies
 */

var pwd = require('pwd');

/**
 * Expose `model-auth`
 *
 * @param {Model} User
 */

module.exports = function(User) {
  User.attr('salt', { required : true, type : 'string' });
  User.on('saving', function(user, done) {
    if(!user.isNew()) return done();
    pwd.hash(user.password(), function(err, salt, hash) {
      user.salt(salt);
      user.password(hash);
      done();
    });
  });

  User.authorize = authorize.bind(User);
};

/**
 * Authorize
 *
 * @param {String} email
 * @param {String} password
 * @param {Function} fn
 */

function authorize(email, password, fn) {
  this.get({ email : email }, function(err, user) {
    if(err || !user) return fn(err, user);
    pwd.hash(password, user.salt(), function(err, hash) {
      if(user.password() == hash) {
        return fn(null, user);
      } else {
        return fn(null, false);
      }
    });
  });
}
