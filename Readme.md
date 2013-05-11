# auth

  Server-side plugin for modella. Supports auto-salting, password hashing (using pbkdf2) and authorization.

## API

auth introduces the following methods to your modella models:

### Model#authorize(email, password)

Authorize your model with `email` and `password`. Returns the model's `id` if the given credentials are correct, will return `false` if they don't match up, or an `err` if something bad happened.

## TODO

* Allow custom attributes. Right now, plugin requires `email` & `password` fields.

## License 

MIT
