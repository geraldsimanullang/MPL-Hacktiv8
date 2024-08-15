'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { readFile } = require('fs').promises

    const data = JSON.parse(await readFile('./data/heroes.json', 'utf-8')).map(hero => {
      hero.createdAt = hero.updatedAt = new Date()
      return hero
    })

    await queryInterface.bulkInsert('Heros', data)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Heros', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
