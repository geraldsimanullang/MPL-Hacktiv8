'use strict';
const {readFile} = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(await readFile('./data/drafts.json', 'utf-8')).map(draft => {
      draft.createdAt = draft.updatedAt = new Date()
      return draft
    })

    await queryInterface.bulkInsert('Drafts', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drafts', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
