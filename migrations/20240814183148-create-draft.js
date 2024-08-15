'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drafts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        }
      },
      midlaneTeam1: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      goldlaneTeam1: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      explaneTeam1: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      roamTeam1: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      jungleTeam1: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      midlaneTeam2: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      goldlaneTeam2: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      explaneTeam2: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      roamTeam2: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      jungleTeam2: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Heros',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Drafts');
  }
};