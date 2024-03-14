const Task = require('../scheemas/Task')
const mongoose = require('mongoose')

const create = async function(req, res) {
    const { description, duedate } = req.body

    try{
        const creation = await Task.create({
            description: description,
            duedate: duedate
        })

        if(creation){
            return res.status(200).json({
                title: "Create success",
                message: "Task created."
            })
        }else{
            return res.status(200).json({
                title: "Create failed",
                message: "Try again."
            })
        }
    }catch(error){
        return res.status(500).json({
            title: "Create error",
            message: "Unable to create task."
        })
    }
}

const update = async function(req, res) {
    const { description, duedate } = req.body
    const filter = { description: description };
    const update = { duedate: duedate };
    
    try{
        const updating = await Task.findOneAndUpdate(
            filter,
            update
        )
        
        if(updating){
            return res.status(200).json({
                title: "Update success",
                message: "Task updated."
            })
        }else{
            return res.status(500).json({
                title: "Update failed",
                message: "Try again."
            })
        }
    }catch(error){
        return res.status(500).json({
            title: "Update error",
            message: "Unable to update task."
        })
    }
}

const search = async function(req, res) {
    const { description } = req.body
    
    try{
        const task = await Task.findOne({
            description: description
        })
        console.log(typeof(task))

        if(task){
            return res.status(200).json(task)
        }else{
            return res.status(404).json({
                title: "Search failed",
                message: "Try again."
            })
        }

    }catch(error){
        return res.status(500).json({
            title: "Search error",
            message: "Unable to create task."
        })
    }
}

const exclude = async function(req, res) {
    const { description } = req.body
    
    try{
        const deleting = await Task.findOneAndDelete({
            description: description
        })

        if(deleting){
            return res.status(200).json({
                title: "Delete success",
                message: "Task deleted."
            })
        }else{
            return res.status(500).json({
                title: "Delete failed",
                message: "Try again."
            })
        }
    }catch(error){
        return res.status(500).json({
            title: "Delete error",
            message: "Unable to delete task."
        })
    }
}

const done = async function(req, res) {
    const { description, done } = req.body
    
    try{
        const setDone = await Task.findOneAndUpdate(
            {description: description},
            {done: done}
        )
        
        if(setDone){
            return res.status(200).json({
                title: "Done success",
                message: "Task set to done."
            })
        }else{
            return res.status(500).json({
                title: "Done failed",
                message: "Try again."
            })
        }
    }catch(error){
        return res.status(500).json({
            title: "Concluding error",
            message: "Unable to set task to done."
        })
    }
}

const hide = async function(req, res) {
    const { description, hide } = req.body
    
    try{
        const setHide = await Task.findOneAndUpdate(
            {description: description},
            {hide: hide}
        )
        
        if(setHide){
            return res.status(200).json({
                title: "Hide success",
                message: "Task set to done."
            })
        }else{
            return res.status(500).json({
                title: "Hide failed",
                message: "Try again."
            })
        }
    }catch(error){
        return res.status(500).json({
            title: "Hidding error",
            message: "Unable to hide task."
        })
    }
}

const readAll = async function(req, res) {
    try{
        const tasks = await Task.find({})
        return res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json({
            title: "Read error",
            message: "Unable to read all tasks."
        })
    }
}

const readDone = async function(req, res) {
    try{
        const tasks = await Task.find({done: 1})
        return res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json({
            title: "Read error",
            message: "Unable to read all done tasks."
        })
    }
}

const readHide = async function(req, res) {
    try{
        const tasks = await Task.find({hide: 1})
        return res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json({
            title: "Read error",
            message: "Unable to read all hidden tasks."
        })
    }
}

module.exports = {
    create,
    update,
    search,
    exclude,
    done,
    hide,
    readAll,
    readDone,
    readHide
}