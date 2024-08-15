const { compare } = require('../helpers/passwords')
const { User, Team, Hero, Match, Game } = require('../models')

class UserController {

  static renderLogin(req, res) {
    res.render('login')
  }

  static async handleLogin(req, res) {
    try {
      const {username, password} = req.body
      const userFound = await User.findOne({
        where: {
          username: username
        }
      })
  
      if (!userFound) {
        const error = new Error()
        error.name = 'Username atau password salah'
        throw error
      } else {
        const isPasswordTrue = compare(password, userFound.password)

        if (isPasswordTrue) {
          req.session.userId = userFound.id
          req.session.role = userFound.role

          res.redirect('/')
        }
        else {
          res.send('Username atau password salah')
        }
      }
      
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }
  
  static renderRegister(req, res) {
    res.render('register')
  }

  static async handleRegister(req, res) {
    try {
      const { username, email, password } = req.body
      await User.create({ username, email, password })

      res.redirect('/login')
      
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  static renderHome(req, res) {
    res.render('home')
  }

  static async renderTeams(req, res) {
    try {
      const teams = await Team.findAll({
        order: [['name', 'asc']]
      })

      res.render('teams', { teams })
    } catch (error) {
      
    }
  }

  static async renderMatches(req, res) {
    
    const matches = await Match.findAll({
      order: [['date', 'desc']],
      include: [
        {
          model: Team,
          as : 'Team1'
        }, 
        {
          model: Team,
          as: 'Team2'
        }
      ]
    })
    
    // res.send(matches)
    res.render('matches', {matches})
  }

  static async renderMatchDetail(req, res) {
    const {matchId} = req.params
    try {
      const games = await Game.findAll({
        where: {
          MatchId: matchId
        }
      })

      res.send(games)
      // res.render('matchDetail', {games})
      
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }

  static async renderHeroes(req, res) {
    try {
      const heroes = await Hero.findAll({
        order:[['id', 'desc']]
      })

      res.render('heroes', { heroes })
      
    } catch (error) {
      
    }
  }

  static async logout(req, res) {
    await req.session.destroy()
    res.redirect('/login')
  }

}

module.exports = UserController