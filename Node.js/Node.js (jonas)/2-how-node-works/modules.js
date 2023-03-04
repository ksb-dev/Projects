//console.log(arguments)
//console.log(require('module').wrapper)

// 1. module.exports

/*const Calculator = require('./test-module-1')

const calc1 = new Calculator()
console.log(calc1.add(10, 20))*/

// 2. exports

/*const calc2 = require('./test-module-2')
console.log(calc2.add(10, 20))

const { add, multiply, divide } = require('./test-module-2')
console.log(add(10, 20))*/

// 3. Caching

require('./test-module-3')()
