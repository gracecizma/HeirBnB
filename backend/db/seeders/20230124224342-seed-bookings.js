'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2022-05-30'),
        endDate: new Date('2022-06-21')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-01-05'),
        endDate: new Date('2023-01-10')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2022-03-12'),
        endDate: new Date('2022-04-03')
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', {
      startDate: ['2022-05-30', '2023-01-05', '2022-03-12']
    })
  }
};
