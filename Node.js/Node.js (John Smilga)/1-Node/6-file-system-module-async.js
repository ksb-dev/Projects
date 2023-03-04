const fs = require('fs')

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
        console.log(res)
      }
    )
  })
})
