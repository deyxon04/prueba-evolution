'use strict'

const taskRouter = require('express').Router()
const taskController = require('../controllers/taskController')

taskRouter.get('/task', taskController.getTask)
taskRouter.post('/task', taskController.createTask)
taskRouter.put('/task/:_id', taskController.updateTask)
taskRouter.delete('/task/:_id', taskController.deleteTask)
taskRouter.get('/task/notifications', taskController.taskNotifications)

module.exports = taskRouter
