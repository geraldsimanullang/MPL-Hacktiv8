'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.Player)
      Game.belongsTo(models.Match)
      Game.hasOne(models.Draft)
    }
  }
  Game.init({
    MatchId: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    midlanerTeam1: DataTypes.INTEGER,
    goldlanerTeam2: DataTypes.INTEGER,
    explanerTeam1: DataTypes.INTEGER,
    roamerTeam1: DataTypes.INTEGER,
    junglerTeam1: DataTypes.INTEGER,
    midlanerTeam2: DataTypes.INTEGER,
    goldlanerTeam2: DataTypes.INTEGER,
    explanerTeam2: DataTypes.INTEGER,
    roamerTeam2: DataTypes.INTEGER,
    junglerTeam2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};