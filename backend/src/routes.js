const express = require('express')
const router = express.Router()
const TaskController = require('./database/controllers/TaskController')

router.post('/create', TaskController.create)
router.post('/search', TaskController.search)
router.delete('/delete', TaskController.exclude)
router.put('/update', TaskController.update)
router.put('/done', TaskController.done)
router.put('/hide', TaskController.hide)

router.get('/readAll', TaskController.readAll)
router.get('/readDone', TaskController.readDone)
router.get('/readHide', TaskController.readHide)

module.exports = router