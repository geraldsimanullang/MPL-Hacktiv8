'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { readFile } = require('fs').promises

    const data = JSON.parse(await readFile('./data/teams.json', 'utf-8')).map(team => {
      team.createdAt = team.updatedAt = new Date()
      return team
    })

    await queryInterface.bulkInsert('Teams', data)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teams', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
