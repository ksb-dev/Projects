const express = require('express')
const app = express()
const { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json())

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find(person => person.id === Number(id))

  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `No person with id ${id}` })
  }

  const newPeople = people.map(person => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })

  res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
