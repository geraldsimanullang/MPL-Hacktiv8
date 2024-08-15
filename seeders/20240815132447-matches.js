'use strict';
const { readFile } = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(await readFile('./data/matches.json', 'utf-8')).map(match => {
      match.createdAt = match.updatedAt = new Date()
      return match
    })

    await queryInterface.bulkInsert('Matches', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Matches', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
