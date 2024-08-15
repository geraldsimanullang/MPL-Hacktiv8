const { Team, Player, Match, Game, Hero, Draft } = require('../models')
const match = require('../models/match')

class AdminController {

  static async renderAddMatch(req, res) {
    const {errors} = req.query
    let errorsMsg;
    if (errors) {
      errorsMsg = errors.split('. ')
    }
    try {
      const teams = await Team.findAll({
        include: Player,
        order: [['id', 'asc']]
      })
      
      res.render('addMatch', { teams, errorsMsg })
      
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }

  static async handleAddMatch(req, res) {
    try {
      const {date, team1Id, team2Id} = req.body
      await Match.create({date, team1Id, team2Id})
  
      res.redirect('/matches')
      
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        const message = error.errors.map(error => {
          return error.message
        }).join('. ')

        res.redirect(`/add/match?errors=${message}`)

      } else {
        console.log(error)
        res.send(error.message)
      }
    }
  }

  static async renderAddGame(req, res) {
    const { matchId } = req.params  
    try {
      const teams = await Match.findByPk(+matchId, {
        include: [
          {
            model: Team,
            as: 'Team1',
            include: Player
          },
          {
            model: Team,
            as: 'Team2',
            include: Player
          },
        ]
      })

      const heroes = await Hero.findAll({
        order: [['id', 'desc']]
      })

      res.render('addGame', {teams, heroes})

    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }

  static async handleAddGame(req, res) {
    const { matchId } = req.params 
    const {
      winner,
      midlanerTeam1,
      goldlanerTeam1,
      explanerTeam1,
      roamerTeam1,
      junglerTeam1,
      midlanerTeam2,
      goldlanerTeam2,
      explanerTeam2,
      roamerTeam2,
      junglerTeam2,

      midlaneTeam1,
      goldlaneTeam1,
      explaneTeam1,
      roamTeam1,
      jungleTeam1,
      midlaneTeam2,
      goldlaneTeam2,
      explaneTeam2,
      roamTeam2,
      jungleTeam2,
    } = req.body

    try {
      // res.send(req.body)
      const newGame = await Game.create({
        MatchId: +matchId,
        winner : +winner,
        midlanerTeam1: +midlanerTeam1,
        goldlanerTeam1: +goldlanerTeam1,
        explanerTeam1: +explanerTeam1,
        roamerTeam1: +roamerTeam1,
        junglerTeam1: +junglerTeam1,
        midlanerTeam2: +midlanerTeam2,
        goldlanerTeam2: +goldlanerTeam2,
        explanerTeam2: +explanerTeam2,
        roamerTeam2: +roamerTeam2,
        junglerTeam2: +junglerTeam2,

      })

      await Draft.create({
        GameId: +newGame.id,
        midlaneTeam1: +midlaneTeam1,
        goldlaneTeam1: +goldlaneTeam1,
        explaneTeam1: +explaneTeam1,
        roamTeam1: +roamTeam1,
        jungleTeam1: +jungleTeam1,
        midlaneTeam2: +midlaneTeam2,
        goldlaneTeam2: +goldlaneTeam2,
        explaneTeam2: +explaneTeam2,
        roamTeam2: +roamTeam2,
        jungleTeam2: +jungleTeam2
      })

      res.redirect(`/matches/${matchId}`)
      
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    
  }

  static async renderEditMatch(req, res) {
    const {matchId} = req.params
    const teams = await Team.findAll({
      include: Player,
      order: [['id', 'asc']]
    })

    const match = await Match.findByPk(matchId, {
      include: [
        {
          model: Team,
          as: 'Team1'
        },
        {
          model: Team,
          as: 'Team2'
        }
      ]
    })

    res.render('editMatch', {teams, match})
  }

  static async handleEditMatch(req, res) {
    const {matchId} = req.params
    const {date} = req.body

    await Match.update({date}, {
      where: {
        id: matchId
      }
    })

    res.redirect('/matches')
  }

  static async deleteGame(req, res) {
    const {gameId} = req.params
    try {
      await Draft.destroy({
        where: {
          GameId: gameId
        }
      })
      await Game.destroy({
        where: {
          id: gameId
        }
      })
      res.redirect('/matches')
      
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }
}

module.exports = AdminController