const express = require('express')
const userController = require('../controllers/userController')
const checkAuthentication = require('../middlewares/checkAuth')
const checkRoleUser = require('../middlewares/checkRole')
const userRouter = express.Router()
userRouter.post('/register', userController.handleRegister)
userRouter.post('/login', userController.handleLogin)
userRouter.get('/', checkAuthentication, checkRoleUser, userController.getAllUser)
userRouter.get('/forgot', userController.showForgotPassword)
userRouter.post('/forgot', userController.forgotPassword)
// userRouter.get('/reset', userController.showResetPassword)
userRouter.post('/reset', userController.resetPassword)



module.exports = userRouter