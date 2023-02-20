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
        spotId: 2,
        url: "https://imageio.forbes.com/blogs-images/carriecoolidge/files/2018/10/10.-Clarke-Avenue.jpg?format=jpg&width=960",
        preview: false
      },
      {
        spotId: 2,
        url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/3/27/0/HUHH2019-Waterfront_Osterville-MA_005.jpg.rend.hgtvcom.616.411.suffix/1553706598088.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://s.wsj.net/public/resources/images/B3-CV891_0110_d_IM_20190109141426.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://static2.mansionglobal.com/production/media/article-images/b809ba0ca644e7894a13eab2e6a0649c/large_Achille-Salvagni1.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://static.onecms.io/wp-content/uploads/sites/34/2021/05/17/the-breakers-mansion-alt-getty-0521-2000.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i.pinimg.com/originals/1d/5d/cb/1d5dcb87c251a8633a5a3b6de2c77a3b.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://designingidea.com/wp-content/uploads/2017/02/amazing-mansion-bathroom-with-pillars-central-tub-chandelier-and-mosaic-tilework.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/WORXOAS6OVC7ZBPBEDYZOKMCXA.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://img1.cgtrader.com/items/774251/03d5a69db3/large/interior-classical-mansion-2-3d-model-max.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://imageio.forbes.com/blogs-images/amydobson/files/2019/04/212-5th-Exterior-1200x817.jpg?format=jpg&width=960",
        preview: true
      },
      {
        spotId: 4,
        url: "https://imageio.forbes.com/specials-images/imageserve/5d0147a3142c50000a32be8f/The-outdoor-terrace-of-a-Manhattan-penthouse-with-a-glass-walled-hot-tub-/960x0.jpg?format=jpg&width=960",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.realestate.com.au/blog/images/2000x1500-fit,progressive/2018/05/21150042/kitchen-nyc-hells-kitchen.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://static01.nyt.com/images/2014/11/13/garden/20141113-BATHROOM-slide-MAH7/20141113-BATHROOM-slide-MAH7-superJumbo.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://images.dwell.com/photos-6063391372700811264/6575094756175896576-large/wall-length-windows-and-18-to-32-foot-high-ceilings-effortlessly-capture-views-of-the-citys-skyline-while-also-ushering-in-an-abundance-of-natural-light.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuc2lvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.adsttc.com/media/images/623a/ccba/3e4b/3174/1a00/0011/newsletter/FI.jpg?1648020659",
        preview: false
      },
      {
        spotId: 5,
        url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/5/16/0/HUHH2022_Global-Homes_Canada-09.jpg.rend.hgtvcom.966.644.suffix/1652726262349.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://amazingarchitecture.com/storage/1068/the-mansion-karv-one-design-china.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-colours-for-bedroom.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Gelbensande3.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://i.pinimg.com/736x/7f/95/c7/7f95c7f96cd8dda384b44182807a80f8.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://st.hzcdn.com/simgs/pictures/kitchens/whitefish-bay-tudor-kitchen-angela-westmore-llc-img~f3710d3e09c2eb52_14-9951-1-4d7b674.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://www.architectureartdesigns.com/wp-content/uploads/2015/04/16-Extraordinary-Fresh-Rustic-Bathroom-Interior-Designs-12-1280x720.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.pinimg.com/originals/59/98/e4/5998e49d06efe5bd0ae3a23735519ed4.jpg",
        preview: false
      },
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
