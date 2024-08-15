'use strict';
const {
  Model
} = require('sequelize');
const { countScore } = require('../helpers/countScore');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Match.hasMany(models.Game)
      Match.belongsTo(models.Team, {foreignKey: 'team1Id', as: 'Team1'})
      Match.belongsTo(models.Team, {foreignKey: 'team2Id', as: 'Team2'})
    }
  }
  Match.init({
    date: DataTypes.DATE,
    team1Id: DataTypes.INTEGER,
    team2Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};