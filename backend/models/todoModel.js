const asyncHandler = require('express-async-handler');
const Todo = require('../schemas/todoSchema');


exports.getTodos = asyncHandler(async (req, res) => {
  const data = await Todo.find({ user: req.userData.id })
  res.status(200).json(data)
})

exports.createTodo = asyncHandler(async (req, res) => {

  const todo = await Todo.create({
    user: req.userData.id,
    title: req.body.title
  })

  res.status(201).json(todo)

})


exports.updateTodo = asyncHandler(async (req, res) => {

  const todo = await Todo.findOne({ _id: req.params.id })

  if(!todo) {
    res.status(404)
    throw new Error('Sorry, could not fint the todo')
  }

  if(todo.user.toString() !== req.userData.id) {
    res.status(401)
    throw new Error('User not authorized!')
  }

  const updatedTodo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  res.status(200).json(updatedTodo);

})

exports.deleteTodo = asyncHandler(async (req, res) => {

  const todo = await Todo.findOne({ _id: req.params.id })

  if(!todo) {
    res.status(404)
    throw new Error('Sorry, could not fint the todo')
  }
  if(todo.user.toString() !== req.userData.id) {
    res.status(401)
    throw new Error('User not authorized!')
  }

  const { _id } = await todo.remove()

  res.status(200).json({ id: _id })

})