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
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 1,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 1,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 1,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 2,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 2,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 2,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 3,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 3,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 3,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 4,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 4,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 4,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 5,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 5,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 5,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 6,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 6,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 6,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 7,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 7,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "preview": false
      },
      {
        "spotId": 7,
        "url": "https://plus.unsplash.com/premium_photo-1684863506867-4a33a434e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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
