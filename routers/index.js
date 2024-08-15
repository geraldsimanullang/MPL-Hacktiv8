const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')


router.get('/', (req, res) => res.render('home.ejs'))
router.get('/login', UserController.renderLogin)
router.post('/login', UserController.handleLogin)
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.handleRegister)
// ------ tambahan update !!
router.get('/match', UserController.renderMatch)
router.get('/team', UserController.renderTeam)
router.get('/hero', UserController.renderHero)
// ------ tambahan update !!
module.exports = router