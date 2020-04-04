# method-stack
Gets a formatted method stack at any point of the code.

### Usage Example
```js
// a.js

const b = require('./b');

b.doSomething();
```

```js
// b.js

const c = require('./c');

const doSomething = () => {
  c.doSomething();
};

module.exports = { doSomething };
```


```js
// c.js

const stack = require('method-stack');
const doSomething = () => {
  console.log(stack.getCaller());
  /* Prints the caller, example:
  {
    file: 'C:\\Users\\User\\Documents\\Workspaces\\Lefcott\\npm\\method-stack\\b.js',
    method: 'doSomething',
    line: 6,
    col: 5
  }
  */
  console.log(stack.getCaller(1));
  /* Prints the caller of the caller, example:
  {
    file: 'C:\\Users\\User\\Documents\\Workspaces\\Lefcott\\npm\\method-stack\\a.js',
    method: '<anonymous>',
    line: 5,
    col: 3
  }
  */
 
  console.log(stack.get());
  /* Prints the full method stack, example:
  [
    {
      file: 'C:\\Users\\User\\Documents\\Workspaces\\Lefcott\\npm\\method-stack\\b.js',
      method: 'doSomething',
      line: 6,
      col: 5
    },
    {
      file: 'C:\\Users\\User\\Documents\\Workspaces\\Lefcott\\npm\\method-stack\\a.js',
      method: '<anonymous>',
      line: 5,
      col: 3
    },
    { file: 'cjs/loader.js', method: '_compile', line: 1147, col: 30 },
    { file: 'cjs/loader.js', method: 'js', line: 1167, col: 10 },
    { file: 'cjs/loader.js', method: 'load', line: 996, col: 32 },
    { file: 'cjs/loader.js', method: '_load', line: 896, col: 14 },
    {
      file: 'modules/run_main.js',
      method: 'executeUserEntryPoint',
      line: 71,
      col: 12
    }
  ]
  */
};
module.exports = { doSomething };
```
