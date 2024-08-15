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
      Player.hasMany(models.Game, {foreignKey: 'midlanerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'goldlanerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'explanerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'roamerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'junglerTeam1'})
      Player.hasMany(models.Game, {foreignKey: 'midlanerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'goldlanerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'explanerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'roamerTeam2'})
      Player.hasMany(models.Game, {foreignKey: 'junglerTeam2'})
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