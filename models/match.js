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
    get formattedDate() {
      return this.date.toLocaleString('id-ID')
    }

    static associate(models) {
      Match.hasMany(models.Game)
      Match.belongsTo(models.Team, {foreignKey: 'team1Id', as: 'Team1'})
      Match.belongsTo(models.Team, {foreignKey: 'team2Id', as: 'Team2'})
    }
  }
  Match.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Harap masukkan tanggal dengan lengkap'
        },
        notNull: {
          msg: 'Harap masukkan tanggal dengan lengkap'
        }
      }
    },
    team1Id: { 
      type :DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Pilih tim belum lengkap'
        },
        notNull: {
          msg: 'Pilih tim belum lengkap'
        }
      }
    },
    team2Id: { 
      type :DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Pilih tim belum lengkap'
        },
        notNull: {
          msg: 'Pilih tim belum lengkap'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};