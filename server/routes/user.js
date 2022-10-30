const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//get all users
router.get('/', userController.view)
//find user by serch
router.post('/', userController.find)
//add new user 
router.post('/add-user', userController.addUser)
//get the new user
router.get('/add-user', userController.form)
//edit user by id
router.get('/edit-user/:id', userController.editUser)
//update user by id
router.post('/edit-user/:id', userController.updateUser)
//delete user by id
router.get('/:id', userController.deleteUser)
//view user by id
router.get('/view-user/:id', userController.viewUser)

module.exports = router