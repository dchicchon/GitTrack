'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Administrators', [{
      firstName: 'Guy',
      lastName: 'Fieri',
      email: 'guy@gmail.com',
      password: 'flavortown',
      userType: 'administrator',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Administrators', null, {})
  }
};
