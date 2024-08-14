'use strict';

const { hash } = require('../helpers/passwords');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = 'rahasia'
    const hashedPassword = hash(password)
    
    await queryInterface.bulkInsert('Users', [
      {
        username: 'gerald',
        email: 'gerald@hacktiv8.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'jungun',
        email: 'jungun@hacktiv8.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
