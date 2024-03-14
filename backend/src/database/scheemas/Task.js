const mongoose = require('mongoose')

const Task = new mongoose.Schema ({
    description: {
        type: String,
        unique: true,
        required: true
    },
    duedate:{
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    hide: {
        type: Boolean,
        default: false
    }
})

const TaskModel = mongoose.model('Task', Task)
module.exports = TaskModel