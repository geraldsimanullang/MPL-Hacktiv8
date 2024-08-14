'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Draft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Draft.belongsTo(models.Game)
      Draft.belongsTo(models.Hero)
    }
  }
  Draft.init({
    GameId: DataTypes.INTEGER,
    midlaneTeam1: DataTypes.INTEGER,
    goldlaneTeam1: DataTypes.INTEGER,
    explaneTeam1: DataTypes.INTEGER,
    roamTeam1: DataTypes.INTEGER,
    jungleTeam1: DataTypes.INTEGER,
    midlaneTeam2: DataTypes.INTEGER,
    goldlaneTeam2: DataTypes.INTEGER,
    explaneTeam2: DataTypes.INTEGER,
    roamTeam2: DataTypes.INTEGER,
    jungleTeam2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Draft',
  });
  return Draft;
};