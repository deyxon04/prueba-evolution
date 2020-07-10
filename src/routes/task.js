'use strict'

const taskRouter = require('express').Router()
const taskController = require('../controllers/taskController')

taskRouter.get('/task', taskController.getTask)
taskRouter.post('/task', taskController.createTask)
taskRouter.put('/task/:id', taskController.updateTask)
taskRouter.delete('/task/:id', taskController.deleteTask)

module.exports = taskRouter
