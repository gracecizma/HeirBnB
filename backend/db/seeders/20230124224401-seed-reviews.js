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
    await queryInterface.bulkInsert('Reviews', [
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
    await queryInterface.bulkDelete('Reviews', {
      review: ["Nice house", "Fun place and nicely decorated", "This place sucks"]
    })
  }
};
