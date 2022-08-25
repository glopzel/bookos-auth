const express = require('express')
const router = express.Router()
// home controller
const homeController = require('../controllers/homeControl')

router.get('/', homeController.getIndex)

module.exports = router