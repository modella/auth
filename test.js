var modella = require('modella');
var memory = require('modella-memory');
var auth = require('./index.js');
var assert = require('assert');

// Create model
var User = modella('user')
  .attr('id')
  .attr('email')
  .attr('pass');

// Use middleware
User.use(memory());
User.use(auth({password: 'pass'}));

// creating
User()
  .email('a@b.com')
  .pass('secretz')
  .save(function (err, res) {
    res.pass(); // salted password
    res.salt(); // hash

    User.authenticate(res, '1234', function (err, user) {
      if (err) assert.fail(err, false, 'something went wrong');
      assert.equal(user, false); // not authorized
    });

    User.authenticate(res, 'secretz', function (err, user) {
      if (err) assert.fail(err, false, 'something went wrong');
      assert.ok(user); // authorized
    });

  });

