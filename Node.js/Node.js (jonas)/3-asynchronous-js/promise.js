const fs = require('fs')
const superagent = require('superagent')

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file')
      resolve(data)
    })
  })
}

const writeFilePromise = (file, response) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, response, err => {
      if (err) reject('Could not write to a file')
      resolve('success')
    })
  })
}

readFilePromise('./dog.txt')
  .then(data => {
    console.log(`Breed: ${data}`)

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then(res => {
    console.log(res.body.message)

    return writeFilePromise('./dog-img.txt', res.body.message)
  })
  .then(() => {
    console.log('Random dog image URL saved to dog-img.txt file')
  })
  .catch(err => {
    console.log(err)
  })
