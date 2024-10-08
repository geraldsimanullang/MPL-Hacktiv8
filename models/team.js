'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.Player)
      Team.hasMany(models.Game, {foreignKey: 'winner', as: 'WinnerTeam'})
      Team.hasMany(models.Match, {foreignKey: 'team1Id', as: 'Team1'})
      Team.hasMany(models.Match, {foreignKey: 'team2Id', as: 'Team2'})
    }
  }
  Team.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    abbreviation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};