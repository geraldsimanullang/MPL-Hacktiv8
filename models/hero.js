'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hero.hasMany(models.Draft, {foreignKey: 'midlaneTeam1', as: 'MidlaneTeam1'})
      Hero.hasMany(models.Draft, {foreignKey: 'goldlaneTeam1', as: 'GoldlaneTeam1'})
      Hero.hasMany(models.Draft, {foreignKey: 'explaneTeam1', as: 'ExplaneTeam1'})
      Hero.hasMany(models.Draft, {foreignKey: 'roamTeam1', as: 'RoamTeam1'})
      Hero.hasMany(models.Draft, {foreignKey: 'jungleTeam1', as: 'JungleTeam1'})
      Hero.hasMany(models.Draft, {foreignKey: 'midlaneTeam2', as: 'MidlaneTeam2'})
      Hero.hasMany(models.Draft, {foreignKey: 'goldlaneTeam2', as: 'GoldlaneTeam2'})
      Hero.hasMany(models.Draft, {foreignKey: 'explaneTeam2', as: 'ExplaneTeam2'})
      Hero.hasMany(models.Draft, {foreignKey: 'roamTeam2', as: 'RoamTeam2'})
      Hero.hasMany(models.Draft, {foreignKey: 'jungleTeam2', as: 'JungleTeam2'})
    }
  }
  Hero.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hero',
  });
  return Hero;
};