'use strict';
const { SpotImage } = require('../models');
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
    await SpotImage.bulkCreate([
      {
        "spotId": 1,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": true
      },
      {
        "spotId": 1,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 1,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 1,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 2,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 2,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 2,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      },
      {
        "spotId": 3,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 3,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      },
      {
        "spotId": 3,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 4,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      },
      {
        "spotId": 4,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 4,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 5,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 5,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 5,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      },
      {
        "spotId": 6,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 6,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      },
      {
        "spotId": 6,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 7,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      },
      {
        "spotId": 7,
        "url": "https://phototraces.b-cdn.net/wp-content/uploads/2020/11/id_Composition_in_Photography_07_Aspect_4x3.jpg",
        "preview": false
      },
      {
        "spotId": 7,
        "url": "https://elitescreens.com/wp-content/uploads/2019/10/4-3-Still.png",
        "preview": false
      }



      ,])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName='SpotImages'
    const Op=Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      spotId: {[Op.between]:[1,7]}
    },{})
  }
};
