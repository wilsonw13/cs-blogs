---
title: 'this' in JavaScript and Vue
author: Wilson Wuchen
date: 7-12-2022
tags: ["JavaScript"]
image: 
slug: 2022-07-12
---

### Table of Contents

- [What is the `this` keyword?](#what-is-the-this-keyword)
- [Fixing Unintended Behavior](#fixing-unintended-behavior)
- [The `this` keyword in Vue](#the-this-keyword-in-vue)
  - [Fixing Unintended Behavior in Vue](#fixing-unintended-behavior-in-vue)

> This article focuses on the standard non-strict mode in JavaScript. For information regarding strict mode, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

# What is the `this` keyword?

The value of the `this` keyword depends on where it is called. In the global-scope, `this` refers to the global object, which in web browsers is the `window` object.

```js
console.log(this) // window {...}
```

Inside any non-arrow function, `this` defaults to `undefined` and it changes its definition based on how the function is called. In contrast, arrow functions don't have their own binding to `this` so it refers to the `this` of the parent scope.

```js
this.foo = "bar";

function someFunction() {
    return this.foo;
}

someFunction(); // returns "bar"
```

Calling a function by using the `call()` or `apply()` method allows you to define of `this`. In both these methods, the first parameter defines `this` and rest of the parameters to the function are passed in individually when using `call()` or in an array when using `apply()`.

```js
const sprite = {
    x: 0,
    y: 0
}

function move(dx, dy) {
    this.x += dx;
    this.y += dy;
    
    console.log(`New Position: (${this.x}, ${this.y})`);
}

move.call(sprite, 25, 20); // "New Position: (25, 20)"

move.apply(sprite, [25, 20]); // "New Position: (50, 40)"
```

Alternatively, you can change the context of `this` inside a function with the `bind()` method which creates a new function that sets `this` to the provided value.

```js
// continued off previous code snippet

const moveSprite = move.bind(sprite);

moveSprite(25, 20); // "New Position: (75, 60)"
```

# Fixing Unintended Behavior

This code snippet does not follow our intended behavior, but we can fix it in the following ways.

```js
const sprite = {
  x: 0,
  y: 0,
};

function move(dx, dy) {
  this.x += dx;
  this.y += dy;

  function log() {
    // No matter what 'this' refers to in the move() function scope, 'this' defaults to the window object in the log() function scope
    console.log(`New Position: (${this.x}, ${this.y})`);
  }

  log();
}

move.call(sprite, 25, 20); // "New Position: (undefined, undefined)"
// This logs two 'undefined' since the global object has neither a 'x' nor 'y' property.
```

By using an arrow function: 

```js
function move(dx, dy) {
  this.x += dx;
  this.y += dy;

  const log = () => console.log(`New Position: (${this.x}, ${this.y})`);

  log();
}
```

By passing in `this` as a parameter by modifying the function inputs:

```js
function move(dx, dy) {
  this.x += dx;
  this.y += dy;

  function log(self) {
    console.log(`New Position: (${self.x}, ${self.y})`);
  }

  log(this);
}
```

By using the `call()` or `apply()` method:

```js
function move(dx, dy) {
  this.x += dx;
  this.y += dy;

  function log() {
    console.log(`New Position: (${this.x}, ${this.y})`);
  }

  log.call(this);
}
```

By using `bind()` and binding the function scope of `this` to the parent scope of `this`:

```js
function move(dx, dy) {
  this.x += dx;
  this.y += dy;

  function log() {
    console.log(`New Position: (${this.x}, ${this.y})`);
  }

  log = log.bind(this);

  log();
}
```

By assigning a variable to the parent scope of `this`.

```js
function move(dx, dy) {
  const self = this;

  self.x += dx;
  self.y += dy;

  function log() {
    console.log(`New Position: (${self.x}, ${self.y})`);
  }

  log();
}
```

# The `this` keyword in Vue

Whether you are using the [options API or the composition API](https://markus.oberlehner.net/blog/vue-3-composition-api-vs-options-api/), Vue automatically binds the `this` keyword to refer to the component instance.

Defining a function in the `methods` object using an arrow function is strongly discouraged as the `this` keyword will not be able to be bound to the Vue instance.
  
```js
export default {
  data() {
    return {
      var1: "foo",
      var2: "bar",
      var3: null,
    };
  },
  methods: {
    combine: () => {
      this.var3 = this.var1 + this.var2;
    },
  },
  mounted() {
    this.combine();
  },
}
```

Running this leads to an error:

```
Uncaught TypeError: Cannot read properties of undefined
```

You can avoid using an arrow function by defining the function in these two ways:

```js
methods: {
  combine() {
    this.var3 = this.var1 + this.var2;
  },
},
```

OR

```js
methods: {
  combine: function () {
    this.var3 = this.var1 + this.var2;
  },
},
```


## Fixing Unintended Behavior in Vue

---

Take a look at this example code.

```js
export default {
  data() {
    return {
      x: 0,
      y: 0,
      move_speed: 10 
    };
  },
  methods: {
    startGame() {
      ...
      function gameLoop() {
        if (keyPress.w) moveCharacter(0, -this.move_speed)
        if (keyPress.s) moveCharacter(0, this.move_speed)
        if (keyPress.a) moveCharacter(-this.move_speed, 0)
        if (keyPress.d) moveCharacter(this.move_speed, 0)
      }
      ...
    },
  },
}
```

Unlike in the `startGame()` function scope where the `this` keyword references the Vue instance, the `this` keyword in the gameLoop() function scope defaultly has a value of `undefined`. The easiest way to fix this, and the way that I personally use, is to assign the Vue instance to a variable in the `startGame()` function scope.

```js
export default {
  data() {
    return {
      x: 0,
      y: 0,
      move_speed: 10 
    };
  },
  methods: {
    startGame() {
      // I personally use 't', but others use 'self'
      const t = this;
      ...
      function gameLoop() {
        if (keyPress.w) moveCharacter(0, -t.move_speed)
        if (keyPress.s) moveCharacter(0, t.move_speed)
        if (keyPress.a) moveCharacter(-t.move_speed, 0)
        if (keyPress.d) moveCharacter(t.move_speed, 0)
      }
      ...
    },
  },
}
```