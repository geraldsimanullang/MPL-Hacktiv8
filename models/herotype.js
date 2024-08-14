'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeroType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HeroType.belongsTo(models.Hero)
      HeroType.belongsTo(models.Type)
    }
  }
  HeroType.init({
    HeroId: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HeroType',
  });
  return HeroType;
};