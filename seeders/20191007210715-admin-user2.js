'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Administrators', [{
      firstName: 'Tom',
      lastName: 'Riddle',
      email: 'tom@gmail.com',
      password: 'voldemort',
      userType: 'administrator',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Administrators', null, {})

  }
};
