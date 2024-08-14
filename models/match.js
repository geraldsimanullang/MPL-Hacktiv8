'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Match.hasMany(models.Game)
      Match.belongsTo(models.Team)
    }
  }
  Match.init({
    date: DataTypes.DATE,
    phase: DataTypes.STRING,
    team1Id: DataTypes.INTEGER,
    team2Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};