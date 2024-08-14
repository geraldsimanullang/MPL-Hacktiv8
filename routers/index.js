const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')


router.get('/')
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.handleRegister)

router.get('/teams', UserController.renderTeams)

module.exports = router