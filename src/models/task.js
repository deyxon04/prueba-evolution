
'use strict'

const { Schema, model } = require('mongoose')

const Task = new Schema({
  name: { type: String, required: true },
  priority: { type: String, required: true },
  expiration_date: { type: String, required: true },
  autor: { type: String, required: true }
})

module.exports = model('tasks', Task)
