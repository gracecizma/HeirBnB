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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Varius sit amet mattis vulputate enim. Urna molestie at elementum eu facilisis sed odio. Consequat ac felis donec et odio pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Non quam lacus suspendisse faucibus interdum posuere. Nec feugiat in fermentum posuere urna nec. Nec tincidunt praesent semper feugiat nibh. Faucibus in ornare quam viverra orci sagittis eu volutpat. Nulla facilisi cras fermentum odio eu feugiat. Purus semper eget duis at tellus. Arcu dictum varius duis at consectetur lorem. Vel facilisis volutpat est velit egestas dui. Eget mauris pharetra et ultrices neque ornare aenean euismod. Donec et odio pellentesque diam volutpat commodo sed.',
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
        description: 'Gravida cum sociis natoque penatibus et magnis dis parturient. Lorem mollis aliquam ut porttitor leo a. Aliquet lectus proin nibh nisl. Semper viverra nam libero justo laoreet sit. Diam sollicitudin tempor id eu nisl nunc. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Mi bibendum neque egestas congue quisque egestas diam in arcu. Mauris vitae ultricies leo integer malesuada nunc. Viverra maecenas accumsan lacus vel facilisis volutpat est velit. Neque vitae tempus quam pellentesque nec. Tristique nulla aliquet enim tortor at auctor urna nunc id. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Magna sit amet purus gravida quis blandit. Commodo sed egestas egestas fringilla phasellus. Ullamcorper dignissim cras tincidunt lobortis feugiat. Sed enim ut sem viverra aliquet eget. Porta nibh venenatis cras sed felis eget. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Vitae ultricies leo integer malesuada nunc vel.',
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
        description: 'Dui sapien eget mi proin sed. Est ultricies integer quis auctor elit sed vulputate mi. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Dolor purus non enim praesent elementum. Quam adipiscing vitae proin sagittis nisl. Quis ipsum suspendisse ultrices gravida dictum. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Praesent elementum facilisis leo vel fringilla est. Enim tortor at auctor urna. Quam nulla porttitor massa id neque aliquam vestibulum. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar.',
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
        description: 'Commodo odio aenean sed adipiscing diam. Sit amet commodo nulla facilisi nullam. Nunc congue nisi vitae suscipit tellus mauris. Platea dictumst quisque sagittis purus sit. Arcu dictum varius duis at. Lobortis feugiat vivamus at augue eget arcu dictum varius. Rhoncus dolor purus non enim praesent. Sagittis aliquam malesuada bibendum arcu vitae elementum. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Ipsum nunc aliquet bibendum enim. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Luctus accumsan tortor posuere ac ut consequat semper. Mollis nunc sed id semper risus in. Senectus et netus et malesuada fames ac turpis egestas sed. Posuere ac ut consequat semper viverra nam libero.',
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
        description: 'Posuere ac ut consequat semper viverra nam libero. Eget magna fermentum iaculis eu non diam. Mauris cursus mattis molestie a. Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Sit amet consectetur adipiscing elit ut. Enim ut tellus elementum sagittis. Feugiat pretium nibh ipsum consequat. Faucibus scelerisque eleifend donec pretium. In hac habitasse platea dictumst quisque sagittis purus sit. Gravida cum sociis natoque penatibus et magnis dis parturient. Lobortis elementum nibh tellus molestie nunc non. Hac habitasse platea dictumst quisque sagittis. Ultrices gravida dictum fusce ut placerat. Et tortor consequat id porta nibh venenatis. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Metus aliquam eleifend mi in nulla posuere.',
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
        description: 'Ut sem nulla pharetra diam. Molestie nunc non blandit massa enim. Cras semper auctor neque vitae. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Eros in cursus turpis massa tincidunt. Cursus risus at ultrices mi tempus. Amet mattis vulputate enim nulla. Eu nisl nunc mi ipsum faucibus. Dolor morbi non arcu risus quis. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Dignissim diam quis enim lobortis scelerisque fermentum. Sagittis orci a scelerisque purus semper. Quis imperdiet massa tincidunt nunc pulvinar sapien. Vitae congue mauris rhoncus aenean vel.',
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
