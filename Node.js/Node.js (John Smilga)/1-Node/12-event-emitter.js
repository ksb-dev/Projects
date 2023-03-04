const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
  console.log(`${name} ${id}`)
})
customEmitter.on('response', () => {
  console.log(`Some other logic goes here`)
})

customEmitter.emit('response', 'Kedar', 57)

// order of listening and emitting an event is important (on() them emit())
