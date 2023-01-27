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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Madeup ave',
        city: 'Madison',
        state: 'Wisconsin',
        country: 'United States of America',
        lat: 56.1234567,
        lng: 159.1335469,
        name: 'Nice House',
        description: 'Lorem ipsum dolor sit amet, consectetur.',
        price: 150
      },
      {
        ownerId: 2,
        address: '456 Fake ln',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States of America',
        lat: 37.564842,
        lng: -113.165465,
        name: 'Cool House',
        description: 'Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna.',
        price: 200
      },
      {
        ownerId: 3,
        address: '789 Whatever st',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'United States of America',
        lat: -25.354684,
        lng: 57.657451,
        name: 'Great House',
        description: 'Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in.',
        price: 175
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
    await queryInterface.bulkDelete('Spots', {
      address: ['123 Madeup ave', '456 Fake ln', '789 Whatever st']
    })
  }
};
