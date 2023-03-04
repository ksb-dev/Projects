const mongoose = require('mongoose')

const connectDB = url => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

// For local database
/*const connectDB = url => {
  return mongoose.connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}*/

module.exports = connectDB
