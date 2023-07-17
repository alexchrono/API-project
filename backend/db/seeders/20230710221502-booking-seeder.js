// // 'use strict';
// // const { Booking } = require('../models');
// // const bcrypt = require("bcryptjs");

// // let options = {};
// // if (process.env.NODE_ENV === 'production') {
// //   options.schema = process.env.SCHEMA;  // define your schema in options object
// // }
// // /** @type {import('sequelize-cli').Migration} */
// // module.exports = {
// //   async up (queryInterface, Sequelize) {
// //     /**
// //      * Add seed commands here.
// //      *
// //      * Example:
// //      * await queryInterface.bulkInsert('People', [{
// //      *   name: 'John Doe',
// //      *   isBetaMember: false
// //      * }], {});
// //     */
// //     await Booking.bulkCreate([
// //       {
// //         spotId: 1,
// //         userId: 1,
// //         startDate: '2023-08-12',
// //         endDate: '2023-08-16',

// //       },
// //       {
// //         spotId: 2,
// //         userId: 1,
// //         startDate: '2023-07-14',
// //         endDate: '2023-08-16',

// //       },

// //       {
// //         spotId: 2,
// //         userId: 2,
// //         startDate: '2023-09-15',
// //         endDate: '2023-09-22',

// //       },
// //       {
// //         spotId: 3,
// //         userId: 3,
// //         startDate: '2023-10-01',
// //         endDate: '2023-10-10',

// //       },])
// //   },

// //   async down (queryInterface, Sequelize) {
// //     /**
// //      * Add commands to revert seed here.
// //      *
// //      * Example:
// //      * await queryInterface.bulkDelete('People', null, {});
// //      */
// //     options.tableName = 'Bookings';
// //     const Op = Sequelize.Op;
// //     return await queryInterface.bulkDelete(options, {
// //       userId: {[Op.in]:[1,2,3]}
// //     }, {});
// //   }
// // };



// 'use strict';
// const { Booking } = require('../models');
// const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;  // define your schema in options object
// }
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//     await Booking.bulkCreate([
//       {
//         spotId: 1,
//         userId: 1,
//         startDate: '2023-08-12',
//         endDate: '2023-08-16',

//       },
//       {
//         spotId: 2,
//         userId: 1,
//         startDate: '2023-07-14',
//         endDate: '2023-08-16',

//       },
//       {
//         spotId: 3,
//         userId: 1,
//         startDate: '1985-07-14',
//         endDate: '1986-08-16',

//       },

//       {
//         spotId: 2,
//         userId: 2,
//         startDate: '2023-09-15',
//         endDate: '2023-09-22',

//       },
//       {
//         spotId: 3,
//         userId: 3,
//         startDate: '2023-10-01',
//         endDate: '2023-10-10',

//       },])
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     options.tableName = 'Bookings';
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(options, {
//       userId: {[Op.in]:[1,2,3]}
//     }, {});
//   }
// };



'use strict';
const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-08-12',
        endDate: '2023-08-16',

      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-07-14',
        endDate: '2023-08-16',

      },
      {
        spotId: 3,
        userId: 1,
        startDate: '1985-07-14',
        endDate: '1986-08-16',

      },

      {
        spotId: 2,
        userId: 2,
        startDate: '2023-09-15',
        endDate: '2023-09-22',

      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-10-01',
        endDate: '2023-10-10',

      },])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {[Op.in]:[1,2,3]}
    }, {});
  }
};
