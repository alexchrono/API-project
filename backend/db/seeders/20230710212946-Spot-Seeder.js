// 'use strict';
// const { Spot } = require('../models');
// const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;  // define your schema in options object
// }
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await Spot.bulkCreate([
//       {
//         ownerId: 1,
//         address: '1537 longview',
//         city: 'Atlanta',
//         state: 'Georgia',
//         country: 'USA',
//         lat: 50.45,
//         lng: 70.30,
//         name: 'Alex',
//         description: 'really pretty',
//         price: 17.34,
//       },
//       {
//         ownerId: 2,
//         address: '1600 ShortRidge',
//         city: 'Spring Hill',
//         state: 'Kansas',
//         country: 'USA',
//         lat: 20.45,
//         lng: 30.30,
//         name: 'Anas',
//         description: 'its ok',
//         price: 50.47,
//       },
//       {
//         ownerId: 3,
//         address: '1300 OakRidge',
//         city: 'St. Louis',
//         state: 'Missouri',
//         country: 'USA',
//         lat: 14.15,
//         lng: 90.20,
//         name: 'John',
//         description: 'its ugly',
//         price: 50.47,
//       },
//     ], { validate: true });
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     options.tableName = 'Spots';
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(options, {
//      ownerId: { [Op.in]: [1,2,3] }
//     }, {});
//   }
// };


'use strict';
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: 'ownerHasId1andSpotIdis1',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        lat: 50.45,
        lng: 70.30,
        name: 'SpotBelongsToUser1SpotId1',
        description: 'really pretty',
        price: 20.00,
      },
      {
        ownerId: 1,
        address: 'ownerIsId1spotIdis2',
        city: 'Cleveland',
        state: 'Ohio',
        country: 'USA',
        lat: 2.45,
        lng: 7.30,
        name: 'SpotAlsoBelongsToUser1SpotId2',
        description: 'really pretty',
        price: 17.34,
      },
      {
        ownerId: 2,
        address: 'ownerIsId2andSpotIdis3',
        city: 'Spring Hill',
        state: 'Kansas',
        country: 'USA',
        lat: 20.45,
        lng: 30.30,
        name: 'SpotBelongsToUser2spotId3',
        description: 'its ok',
        price: 50.47,
      },
      {
        ownerId: 3,
        address: 'OwnerIsId3andSpotisId4',
        city: 'St. Louis',
        state: 'Missouri',
        country: 'USA',
        lat: 90.15,
        lng: 100.20,
        name: 'SpotBelongsToUser3spotId4',
        description: 'its ugly',
        price: 100.47,
      },
    ], { validate: true });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
     ownerId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
