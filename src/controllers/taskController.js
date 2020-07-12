'use strict'

const Task = require('../models/task')
const { request, response } = require('express')
const taskController = {}

taskController.createTask = async (request, response, next) => {
    try {
        const { user } = request
        const { name, priority, expiration_date } = request.body
        if (!name && !priority && !expiration_date) {
            const error = new Error('Faltan argumentos')
            error.status = 400
            throw error
        }
        const task = new Task({ name, priority, expiration_date, autor: user['_id'] })
        await task.save()
        return response.status(201).json({
            task
        })
    } catch (error) {
        next(error)
    }
}

taskController.updateTask = async (request, response, next) => {
    try {
        const { name, priority, expiration_date } = request.body
        const { _id } = request.params
        await Task.findByIdAndUpdate(_id, { name, priority, expiration_date })
        const taskUpdated = await Task.findById(_id)
        return response.status(200).json({
            taskUpdated
        })
    } catch (error) {
        next(error)
    }
}

taskController.getTask = async (request, response, next) => {
    try {
        const { user } = request
        const tasks = await Task.find({ autor: user['_id'] })
        return response.status(200).json({
            tasks
        })
    } catch (error) {
        next(error)
    }
}

taskController.deleteTask = async (request, response, next) => {
    try {
        const { _id } = request.params
        await Task.findByIdAndDelete(_id)
        return response.status(200).json({})
    } catch (error) {
        next(error)
    }
}

taskController.taskNotifications = async (request, response, next) => {
    try {
        const { user } = request
        const tasks = await Task.find({ expiration_date: new Date(), autor: user._id })
        return response.status(200).json({tasks})
    } catch (error) {
        next(error)
    }
}

module.exports = taskController
