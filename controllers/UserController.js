const { Op } = require('sequelize')
const countScore = require('../helpers/countScore')
const { compare } = require('../helpers/passwords')
const { User, Team, Hero, Match, Game, Player, Draft } = require('../models')

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
    
    for (const match of matches) {
      match.team1Score = await countScore(match.id, match.Team1.id);
      match.team2Score = await countScore(match.id, match.Team2.id);
    }

    // res.send(matches)
    res.render('matches', {matches})
  }

  static async renderMatchDetail(req, res) {
    const {matchId} = req.params
    try {
      const games = await Game.findAll({
        attributes: ['id', 'MatchId', 'winner'],
        where: {
          MatchId: matchId
        },
        include: [
          {
            model: Match
          },
          {
            model: Team,
            as: 'WinnerTeam'
          },
          {
            model: Player,
            as: 'MidlanerTeam1'
          },
          {
            model: Player,
            as: 'GoldlanerTeam1'
          },
          {
            model: Player,
            as: 'ExplanerTeam1'
          },
          {
            model: Player,
            as: 'RoamerTeam1'
          },
          {
            model: Player,
            as: 'JunglerTeam1'
          },
          {
            model: Player,
            as: 'MidlanerTeam2'
          },
          {
            model: Player,
            as: 'GoldlanerTeam2'
          },
          {
            model: Player,
            as: 'ExplanerTeam2'
          },
          {
            model: Player,
            as: 'RoamerTeam2'
          },
          {
            model: Player,
            as: 'JunglerTeam2'
          }
        ]
      })
      
      const gamesWithDrafts = [];

      for (const game of games) {
        const draft = await Draft.findOne({
          where: {
            GameId: game.id
          }, include: [
            {
              model: Hero,
              as: 'MidlaneTeam1'
            },
            {
              model: Hero,
              as: 'GoldlaneTeam1'
            },
            {
              model: Hero,
              as: 'ExplaneTeam1'
            },
            {
              model: Hero,
              as: 'RoamTeam1'
            },
            {
              model: Hero,
              as: 'JungleTeam1'
            },
            {
              model: Hero,
              as: 'MidlaneTeam2'
            },
            {
              model: Hero,
              as: 'GoldlaneTeam2'
            },
            {
              model: Hero,
              as: 'ExplaneTeam2'
            },
            {
              model: Hero,
              as: 'RoamTeam2'
            },
            {
              model: Hero,
              as: 'JungleTeam2'
            }
          ]
        });
        
        gamesWithDrafts.push({
          ...game.toJSON(),  
          Draft: draft
        });
      }
      // res.send(gamesWithDrafts)
      res.render('matchDetail', {gamesWithDrafts, matchId})
      
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

      // res.send(heroes)
      res.render('heroes', { heroes })
      
    } catch (error) {
      
    }
  }

  static async renderPlayers(req, res) {
    const { search } = req.query
    let option; 
    if(search) {
      option = {
        inGameName: {
          [Op.iLike]: `%${search}%`
        }
      }
    }
    try {
      const players = await Player.findAll({
        order: [['id', 'asc']], 
        include : Team,
        where: option
      })
  
      res.render('players', {players})
      
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }

  static async logout(req, res) {
    await req.session.destroy()
    res.redirect('/login')
  }

}

module.exports = UserController