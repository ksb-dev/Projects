// Synchronous

const fs = require('fs')

/*console.log('start')

const first = fs.readFileSync('./content/first.txt', 'utf-8')
const second = fs.readFileSync('./content/second.txt', 'utf-8')

fs.writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`
  //{ flag: 'a+' }
)

console.log('end')
console.log('starting next one')

// start, end, starting next one*/

// Asynchronous

console.log('start')

fs.readFile('./content/first.txt', 'utf-8', (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  const first = res

  fs.readFile('./content/second.txt', 'utf-8', (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    const second = res

    fs.writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, res) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('end')
      }
    )
  })
})
console.log('starting next one')

// start, starting next one, end
