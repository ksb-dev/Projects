//const { readFile, writeFile } = require('fs')
const { readFile, writeFile } = require('fs').promises

// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

const start = async () => {
  try {
    // const first = await readFilePromise('./content/first.txt', 'utf8')
    // const second = await readFilePromise('./content/second.txt', 'utf-8')
    // await writeFilePromise(
    //   './content/result-mind-grenade.txt',
    //   `THIS IS AWESOME : ${first} ${second}`
    // )

    const first = await readFile('./content/first.txt', 'utf8')
    const second = await readFile('./content/second.txt', 'utf-8')
    await writeFile(
      './content/result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second}`
    )
    console.log(first)
    console.log(second)
  } catch (error) {
    console.log(error)
  }
}

start()
