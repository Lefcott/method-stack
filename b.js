// b.js

const c = require('./c');

const doSomething = () => {
  c.doSomething();
};

module.exports = { doSomething };