const {Game} = require('../models')

async function countScore (matchId, teamId) {
  const winHistories = await Game.findAll({
    where: {
      MatchId: matchId,
      winner: teamId
    }
  })

  return winHistories.length
}

module.exports = countScore