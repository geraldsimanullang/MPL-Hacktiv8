'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsTo(models.Team, {})
      Player.hasMany(models.Game, {foreignKey: 'midlanerTeam1', as: 'MidlanerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'goldlanerTeam1', as: 'GoldlanerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'explanerTeam1', as: 'ExplanerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'roamerTeam1', as: 'RoamerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'junglerTeam1', as: 'JunglerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'midlanerTeam2', as: 'MidlanerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'goldlanerTeam2', as: 'GoldlanerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'explanerTeam2', as: 'ExplanerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'roamerTeam2', as: 'RoamerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'junglerTeam2', as: 'JunglerTeam2'})
    }
  }
  Player.init({
    inGameName: DataTypes.STRING,
    role: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    TeamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};