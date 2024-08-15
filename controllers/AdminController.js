const { Team, Player, Match} = require('../models')

class AdminController {

  static async renderAddMatch(req, res) {
    
    const teams = await Team.findAll({
      include: Player,
      order: [['id', 'asc']]
    })

    res.render('addMatch', { teams })
  }

  static async handleAddMatch(req, res) {
    try {
      const {date, team1Id, team2Id} = req.body
      await Match.create({date, team1Id, team2Id})
  
      res.redirect('/matches')
      
    } catch (error) {
      console.log(error)
      res.send(error.message)
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


      res.render('addGame', {teams})

    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  }

  static async handleAddGame(req, res) {
    try {
      const { matchId } = req.params 
      
    } catch (error) {
      
    }
    
  }

  static async renderAddDraft(req, res) {

  }

}

module.exports = AdminController