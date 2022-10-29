const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//get all users
router.get('/', userController.view)
//find user by serch
router.post('/', userController.find)


module.exports = router