const os = require('os')

const user = os.userInfo()
console.log(user)

console.log(`The system uptime is ${os.uptime()} seconds`)

const currentOS = {
  name: os.type(),
  release: os.release(),
  total_memory: os.totalmem(),
  free_memory: os.freemem()
}

console.log(currentOS)
