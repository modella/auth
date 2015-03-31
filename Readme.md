# auth

  Server-side plugin for modella. Supports auto-salting, password hashing (using pbkdf2) and authorization.

## Example

```js
var modella = require('modella');
var auth = require('modella-auth');

// Create model
var User = modella('user')
  .attr('id')
  .attr('email')
  .attr('pass');

// Use middleware
User.use(auth({ password: 'pass' }));

// creating
User
  .email('a@b.com')
  .pass('secretz')
  .save(function(err, res) {
    user.pass() // salted password
    user.salt() // hash
  })

// after submitting a form
User.authorize(id, body.password, function(err, user) {
  if (err) // something went wrong
  else if (!user) // wrong password
  else // all good!
})

// or authorize an existing user
  User.findOne({email: 'a@b.com'}, function (err, model) {

    User.authorize(model, '1234', function (err, model) {
      if (err) // something went wrong
      else if (!user) // wrong password
      else // all good!
    });

  });

```

## API

## auth(opts)

Initialize auth with the following options:

  - opts.password: the password attribute to lookup (default: `password`)
  - opts.salt: the salt attribute to use as a hash (default: `salt`)

auth introduces the following methods to your modella models:

### Model#authorize(id, password, fn)

Find your model with `id` and confirm it with your `password`. `fn` will return the model if the given credentials are correct, `false` if your credentials are wrong, or an `err` if something bad happened.

## License

MIT
