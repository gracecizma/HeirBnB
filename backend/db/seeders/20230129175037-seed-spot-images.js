'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "SpotImages";

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
        url: "https://www.gannett-cdn.com/presto/2018/09/10/PDEM/fb211df4-d0ef-4088-81c5-cfd11d2490e2-1.jpg?crop=1919,1073,x0,y0&width=1919&height=1073&format=pjpg&auto=webp",
        preview: true
      },
      {
        spotId: 1,
        url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/4/20/0/HUHH2022_Amazing%20Kitchens_Greenwich-CT-Estate-06.jpg.rend.hgtvcom.966.644.suffix/1650498253351.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://luxesource.com/wp-content/uploads/2022/03/LX_COM42_Radar_Roundup_08.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images.squarespace-cdn.com/content/51390587e4b04507fe79d134/1468939543220-E33MRQ85XUC2WSSSNAA3/IMG_2581.JPG?format=1500w&content-type=image%2Fjpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.homestratosphere.com/wp-content/uploads/2020/04/mansion-master-bathroom-apr032020-min.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp",
        preview: true
      },
      {
        spotId: 3,
        url: "https://static.onecms.io/wp-content/uploads/sites/34/2021/05/17/the-breakers-mansion-alt-getty-0521-2000.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://www.manhattanmiami.com/hubfs/NYC%20Penthouses%20for%20Sale.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuc2lvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
        preview: true
      },
      {
        spotId: 6,
        url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Gelbensande3.jpg",
        preview: true
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
      spotId: [1, 2, 3]
    })
  }
};
