const router = require('express').Router();
const todoModel = require('../models/todoModel')
const auth = require('../middleware/auth')

//CRUD

//Create
router.post('/', auth.verifyToken, todoModel.createTodo)

//Read
router.get('/', auth.verifyToken, todoModel.getTodos)

//Update
router.put('/:id', auth.verifyToken, todoModel.updateTodo)

//Delete
router.delete('/:id', auth.verifyToken, todoModel.deleteTodo)

module.exports = router;