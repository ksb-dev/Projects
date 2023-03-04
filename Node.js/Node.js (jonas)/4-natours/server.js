const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app')
const connectDB = require('./DB/connect')

//console.log(app.get('env'))
//console.log(process.env)

const PORT = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
