const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')


router.get('/', (req, res) => res.redirect('/login'))
router.get('/login', UserController.renderLogin)
router.post('/login', UserController.handleLogin)
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.handleRegister)

router.get('/teams', UserController.renderTeams)

module.exports = router