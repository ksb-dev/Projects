const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minLength: 3,
    maxLength: 15
  },
  email: {
    type: String,
    uniqie: true,
    required: [true, 'Please provide your email'],
    validate: {
      validator: validator.isEmail,
      messgae: 'Please provide valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minLength: 6
  }
  //   ,
  //   role: {
  //     type: String,
  //     enum: ['admin', 'user'],
  //     default: 'user'
  //   }
})

// Password hashing before saving to database
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare user password with hashed user password
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
