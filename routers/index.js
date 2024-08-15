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

// router.use(function(req, res, next) {
//   if (req.session.userId) {
//     next()
//   }
//   else {
//     res.redirect('/login')
//   }
// })

router.get('/', UserController.renderHome)
router.get('/matches', UserController.renderMatches)
router.get('/matches/:matchId', UserController.renderMatchDetail)
router.get('/teams', UserController.renderTeams)
router.get('/heroes', UserController.renderHeroes)
router.get('/logout', UserController.logout)

// router.use(function(req, res, next) {
//   if (req.session.role = 'admin') {
//     next()
//   } else {
//     res.redirect('/')
//   }
// })

router.get('/matches/add', AdminController.renderAddMatch)
router.post('/matches/add', AdminController.handleAddMatch)
router.get('/matches/:matchId/games/add', AdminController.renderAddGame)
router.get('/matches/:matchId/games/:gameid/draft/add', AdminController.renderAddDraft)

module.exports = router