'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { readFile } = require('fs').promises

    const data = JSON.parse(await readFile('./data/players.json', 'utf-8')).map(player => {
      player.createdAt = player.updatedAt = new Date()
      return player
    })

    await queryInterface.bulkInsert('Players', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
