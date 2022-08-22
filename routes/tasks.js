const express = require('express')
const { get } = require('mongoose')
const router = express.Router()

const {getAllTasks,createTask,deleteTask,updateTask,getTask} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask)

module.exports = router