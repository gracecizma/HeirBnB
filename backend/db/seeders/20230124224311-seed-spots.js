'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Spots";

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
    await queryInterface.bulkInsert(options, [
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
      },
      {
        ownerId: 4,
        address: '999 Bougie ave',
        city: 'New York',
        state: 'New York',
        country: 'United States of America',
        lat: 56.1234567,
        lng: 159.1335469,
        name: 'Fancy House',
        description: 'Duis aute irure dolor in reprehenderit in voluptate.',
        price: 550
      },
      {
        ownerId: 5,
        address: '987 Boardwalk blvd',
        city: 'Monopoly',
        state: 'New York',
        country: 'United States of America',
        lat: 37.564842,
        lng: -113.165465,
        name: 'Rich House',
        description: 'Integer malesuada nunc vel risus. Non odio euismod lacinia at quis risus.',
        price: 600
      },
      {
        ownerId: 6,
        address: '654 Park ln',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: -25.354684,
        lng: 57.657451,
        name: 'Tech House',
        description: 'Nisl pretium fusce id velit. Rhoncus urna neque viverra justo nec ultrices dui.',
        price: 789
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
    await queryInterface.bulkDelete(options, {
      address: ['123 Madeup ave', '456 Fake ln', '789 Whatever st', '999 Bougie ave', '987 Boardwalk blvd', '654 Park ln']
    })
  }
};
