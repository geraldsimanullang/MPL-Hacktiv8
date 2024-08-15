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
      Draft.belongsTo(models.Hero, {foreignKey: 'midlaneTeam1', as: 'MidlaneTeam1'})
      Draft.belongsTo(models.Hero, {foreignKey: 'goldlaneTeam1', as: 'GoldlaneTeam1'})
      Draft.belongsTo(models.Hero, {foreignKey: 'explaneTeam1', as: 'ExplaneTeam1'})
      Draft.belongsTo(models.Hero, {foreignKey: 'roamTeam1', as: 'RoamTeam1'})
      Draft.belongsTo(models.Hero, {foreignKey: 'jungleTeam1', as: 'JungleTeam1'})
      Draft.belongsTo(models.Hero, {foreignKey: 'midlaneTeam2', as: 'MidlaneTeam2'})
      Draft.belongsTo(models.Hero, {foreignKey: 'goldlaneTeam2', as: 'GoldlaneTeam2'})
      Draft.belongsTo(models.Hero, {foreignKey: 'explaneTeam2', as: 'ExplaneTeam2'})
      Draft.belongsTo(models.Hero, {foreignKey: 'roamTeam2', as: 'RoamTeam2'})
      Draft.belongsTo(models.Hero, {foreignKey: 'jungleTeam2', as: 'JungleTeam2'})

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