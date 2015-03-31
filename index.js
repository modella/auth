/**
 * Module dependencies
 */

var pwd = require('pwd');

/**
 * Expose `model-auth`
 *
 * @param {String} prop
 *
 * @param {Model} model
 */

module.exports = function(opts) {
  opts = opts || {};
  var password = opts.password || 'password';
  var salt = opts.salt || 'salt';

  return function(Model) {
    // attr
    Model.attr(salt);

    // on saving
    Model.on('saving', function(model, done) {
      if(model[salt]()) return done();
      pwd.hash(model[password](), function(err, s, hash) {
        model[salt](s);
        model[password](hash);
        done();
      });
    });

    /**
     * Model.authorize
     *
     * @param {String} query or Model instance
     * @param {String} password
     * @param {Function} fn
     */

    Model.authorize = function authorize(query, pass, fn) {

      if(query instanceof  Model) {
        // query is model
        checkPassword(query, pass, fn);
      } else {
        // find model
        Model.find(query, function (err, model) {
          if (err || !model) return fn(err, model);
          checkPassword(model, pass, fn);
        });
      }

      function checkPassword(model, pass, fn) {
        pwd.hash(pass, model[salt](), function (err, hash) {
          if (model[password]() == hash) {
            return fn(null, model);
          } else {
            return fn(null, false);
          }
        });
      }

    };

  }
};
