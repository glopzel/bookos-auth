const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeControl')
// auth import
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middlewares/auth')

router.get('/', homeController.getIndex)
// auth matters, on controllers => auth
// LOGIN
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
// LOGOUT
router.get('/logout', authController.logout)
// SIGN UP
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router