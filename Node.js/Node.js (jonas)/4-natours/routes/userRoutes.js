// Installed Modules
const express = require('express')

// Initialize Router
const userRouter = express.Router()

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userControllers')

userRouter
  .route('')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = userRouter
