'use strict';

const { readFile } = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(await readFile('./data/games.json', 'utf-8')).map(game => {
      game.createdAt = game.updatedAt = new Date()
      return game
    })

    await queryInterface.bulkInsert('Games', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
