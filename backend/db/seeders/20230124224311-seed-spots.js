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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Varius sit amet mattis vulputate enim.',
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
        description: 'Gravida cum sociis natoque penatibus et magnis dis parturient. Lorem mollis aliquam ut porttitor leo a. Aliquet lectus proin nibh nisl. Semper viverra nam libero justo laoreet sit. Diam sollicitudin tempor id eu nisl nunc.',
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
        description: 'Dui sapien eget mi proin sed. Est ultricies integer quis auctor elit sed vulputate mi. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Dolor purus non enim praesent elementum.',
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
        description: 'Commodo odio aenean sed adipiscing diam. Sit amet commodo nulla facilisi nullam. Nunc congue nisi vitae suscipit tellus mauris. Platea dictumst quisque sagittis purus sit. Arcu dictum varius duis at. Lobortis feugiat vivamus at augue eget arcu dictum varius.',
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
        description: 'Posuere ac ut consequat semper viverra nam libero. Eget magna fermentum iaculis eu non diam. Mauris cursus mattis molestie a. Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque.',
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
        description: 'Ut sem nulla pharetra diam. Molestie nunc non blandit massa enim. Cras semper auctor neque vitae. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Eros in cursus turpis massa tincidunt.',
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
