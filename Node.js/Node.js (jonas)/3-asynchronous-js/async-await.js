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
      resolve('Success')
    })
  })
}

const getDogPic = async () => {
  try {
    const breed = await readFilePromise('./dog.txt')
    console.log(`Breed : ${breed}`)

    /*const response = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )*/

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )
    const all = await Promise.all([res1, res2, res3])
    const imgs = all.map(promise => promise.body.message)
    console.log(imgs)

    /*console.log(response.body.message)

    await writeFilePromise('./dog-img.txt', response.body.message)*/
    await writeFilePromise('./dog-img.txt', imgs.join('\n'))

    console.log('Random dog image URL saved to dog-img.txt file')
  } catch (err) {
    console.log(err)
    throw err
  }
  return '2: READY 🐶'
}

/*console.log('1: Will get dog pics')
getDogPic()
  .then(x => {
    console.log(x)
    console.log('3: Done getting dog pics')
  })
  .catch(err => {
    console.log('ERROR 🎇')
  })*/

// or

;(async () => {
  try {
    console.log('1: Will get dog pics')
    const x = await getDogPic()
    console.log(x)
    console.log('3: Done getting dog pics')
  } catch (err) {
    console.log('ERROR 🎇')
  }
})()
