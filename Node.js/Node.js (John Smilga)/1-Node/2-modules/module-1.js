// Every file is module by default.
// Modules --> Encapsulated code.

const secret = 'SUPER SECRET'
const kedar = 'Kedar'
const tushar = 'Tushar'

//console.log(module)

module.exports = { kedar, tushar }

module.exports.items = ['item1', 'item2']

const person = {
  name: 'Bob'
}

module.exports.singlePerson = person
