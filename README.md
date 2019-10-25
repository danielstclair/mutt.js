# mutt.js

### Description

A minimal type assertion library

### Motivation

Flow and Typescript each have some great advantages and a few tradeoffs. This library is an attempt to get some of the features of those libraries using pure js.

### Usage

#### `isType(...args)(target)`

Returns a boolean if target matches any of the arguments.

**Examples**:

One argument:

```javascript
const { isType } = require('mutt');

const capitalize = (str) => {
  if (isType('string')(str)) {
    return str.toUpperCase();
  }
};
```

Multiple arguments:

```javascript
const { isType, getType } = require('mutt');

const addTogether = (a, b) => {
  const stringOrNumber = isType('string', 'number')(a);
  const matches = isType(getType(a))(b);
  if (stringOrNumber && matches) {
    return a + b;
  }
};
```

Complex types:

```javascript
const { isType } = require('mutt');

const userSchema = {
  firstName: isType('string'),
  lastName: isType('string'),
};
const user1 = { firstName: 'John', lastName: 'Doe' };
const user2 = { firstName: 1 };
isType(userSchema)(user1); // true
isType(userSchema)(user2); // false
```

```javascript
const { isType } = require('mutt');

const userSchema = {
  user: {
    firstName: isType('string', 'null'),
    lastName: isType('string', 'null'),
  },
  auth: {
    token: isType(''), // shorthand
    tokenExpirationDate: isType('date'),
  }
};
const user1 = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
  auth: {
    token: 'token'
    tokenExpirationDate: new Date(),
  },
};
isType(userSchema)(user1) // true
```

```javascript
const { isType } = require('mutt');

const schema = [isType('string')];
const target = ['Jack', 'Diane'];
isType(schema)(target) // true

const schema1 = [isType('string', 'number')]
const target1 = [1, 'hi']
isType(schema1)(target1) // true

const userSchema = {
  user: {
    firstName: isType('string', 'null'),
    lastName: isType('string', 'null'),
  },
  auth: {
    token: isType(''), // shorthand
    tokenExpirationDate: isType('date'),
  }
};
const user1 = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
  auth: {
    token: 'token'
    tokenExpirationDate: new Date(),
  },
};
isType([isType(userSchema)])([user1])
```

#### `makeType(schema, options)(target)`

Will either assert the target to it's type or yield an error or log if there's no way to do that.

**Examples**:
Basic example is useful if there's a potantially null argument in your function.

```javascript
const { makeType } = require('mutt');

const addToThree = (a) => {
  const target = makeType('number')(a); // a or 0
  return target + 3;
};
```

More complex examples are useful to make sure we can't interact with other items of an object.

```javascript
const { makeType, isType } = require('mutt');

const schema = {
  firstName: isType('string'),
  +email: isType('string'), // readonly string
  auth: {
    token: isType('string'),
  }
};
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
};
const currentUser = makeType(schema)(user);
console.log(currentUser) // { firstName: 'John', email: 'johndoe@email.com', auth: { token: '' } }
currentUser.firstName = 'Jane';
currentUser.email = 'hi there' // console.error('Field "email" is read only but is being mutated.')
currentUser.lastName = 'Deer'; // console.error('Cannot set field "lastName" because it is not present in schema)
console.log(currentUser.email); // johndoe@email.com
console.log(currentUser.lastName); // undefined
```

We can also make things throw if we want to.

```javascript
const currentUser = makeType(schema, { strict: true })(user);
currentUser.email = 'hi there'; // Error! Cannot modify readonly fields. Field "email" was attempted to be modified
```

Alternatively, we can just pass silently.

```javascript
const currentUser = makeType(schema, { silent: true })(user);
currentUser.email = 'hi there'; // no logs or error
console.log(currentUser.email); // johndoe@email.com
```

#### `getType(target)`

Will return the type of a target

```javascript
getType(1); // Number
getType('1'); // String
getType(new Promise()); // Promise
getType(async () => ({})); // Async
getType(new Date()); // Date
```
