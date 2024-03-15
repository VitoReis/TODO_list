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
            return res.status(500).json({
                title: "Create failed",
                message: "Try again."
            })
        }
    }catch(error){
        return res.status(500).json({
            title: "Create error",
            message: error
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
            message: error
        })
    }
}

const search = async function(req, res) {
    const { description } = req.body
    
    try{
        const task = await Task.findOne({
            description: description
        })

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
            message: error
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
            message: error
        })
    }
}

const done = async function(req, res) {
    const { description } = req.body
    
    try{
        const setDone = await Task.findOneAndUpdate(
            {description: description},
            {done: 1}
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
            message: error
        })
    }
}

const hide = async function(req, res) {
    const { description } = req.body
    
    try{
        const setHide = await Task.findOneAndUpdate(
            {description: description, done: 1},
            {hide: 1}
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
            message: error
        })
    }
}

const readAll = async function(req, res) {
    try{
        const tasks = await Task.find({hide: 0})
        return res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json({
            title: "Read error",
            message: error
        })
    }
}

const readDone = async function(req, res) {
    try{
        const tasks = await Task.find({done: 1, hide: 0})
        return res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json({
            title: "Read error",
            message: error
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
            message: error
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