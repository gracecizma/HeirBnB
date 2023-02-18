'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Reviews";

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
        spotId: 1,
        userId: 2,
        review: "Nice house",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: "Fun place and nicely decorated",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "This place sucks",
        stars: 1
      },
      {
        spotId: 4,
        userId: 5,
        review: "I expected better.",
        stars: 4
      },
      {
        spotId: 5,
        userId: 6,
        review: "Nice view",
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: "Marble toilets instead of gold",
        stars: 1
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
      review: ["Nice house", "Fun place and nicely decorated", "This place sucks", "I expected better.", "Nice view", "Marble toilets instead of gold"]
    })
  }
};
