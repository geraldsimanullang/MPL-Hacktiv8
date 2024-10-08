const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const AdminController = require('../controllers/AdminController')

function preventLoginIfLoggedIn(req, res, next) {
  if (req.session.userId) {
    res.redirect('/')
  } else {
    next()
  }
}

router.get('/login', preventLoginIfLoggedIn, UserController.renderLogin)
router.post('/login', preventLoginIfLoggedIn, UserController.handleLogin)
router.get('/register', preventLoginIfLoggedIn, UserController.renderRegister)
router.post('/register', preventLoginIfLoggedIn, UserController.handleRegister)

router.use(function(req, res, next) {
  if (req.session.userId) {
    next()
  }
  else {
    res.redirect('/login')
  }
})

router.get('/', (req, res) => {
  res.redirect('/matches')
})
router.get('/matches', UserController.renderMatches)
router.get('/matches/:matchId', UserController.renderMatchDetail)
router.get('/teams', UserController.renderTeams)
router.get('/players', UserController.renderPlayers)
router.get('/heroes', UserController.renderHeroes)
router.get('/logout', UserController.logout)

router.use(function(req, res, next) {
  if (req.session.role = 'admin') {
    next()
  } else {
    res.redirect('/')
  }
})

router.get('/add/match/', AdminController.renderAddMatch)
router.post('/add/match/', AdminController.handleAddMatch)
router.get('/add/match/:matchId/games/', AdminController.renderAddGame)
router.post('/add/match/:matchId/games/', AdminController.handleAddGame)
router.get('/edit/match/:matchId', AdminController.renderEditMatch)
router.post('/edit/match/:matchId', AdminController.handleEditMatch)
router.get('/delete/:gameId', AdminController.deleteGame)

module.exports = router