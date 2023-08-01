'use strict';
const { ReviewImage } = require('../models');
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
    await ReviewImage.bulkCreate([
      {
        "reviewId": 1,
        "url": "https://images.unsplash.com/photo-1560807707-ec84b82629dc"
      },
      {
        "reviewId": 2,
        "url": "https://images.unsplash.com/photo-1558788353-84f07c43f27f"
      },
      {
        "reviewId": 3,
        "url": "https://images.unsplash.com/photo-1560807707-1bf051a20e09"
      },
      {
        "reviewId": 4,
        "url": "https://images.unsplash.com/photo-1558711307-8cc77767d783"
      },
      {
        "reviewId": 5,
        "url": "https://images.unsplash.com/photo-1564669573161-02c4a9b8e956"
      },
      {
        "reviewId": 6,
        "url": "https://images.unsplash.com/photo-1565628909421-3dd957c08e70"
      },
      {
        "reviewId": 7,
        "url": "https://images.unsplash.com/photo-1565806216888-c9f2073d68ce"
      },
      {
        "reviewId": 8,
        "url": "https://images.unsplash.com/photo-1566750231908-e23e4dcbf34d"
      },
      {
        "reviewId": 9,
        "url": "https://images.unsplash.com/photo-1566770577875-548e5ab235e7"
      },
      {
        "reviewId": 10,
        "url": "https://images.unsplash.com/photo-1567126779304-cbc42d60e99f"
      },
      {
        "reviewId": 11,
        "url": "https://images.unsplash.com/photo-1567641712353-55dbbed93e3f"
      },
      {
        "reviewId": 12,
        "url": "https://images.unsplash.com/photo-1567882484394-72105cc06e9f"
      },
      {
        "reviewId": 13,
        "url": "https://images.unsplash.com/photo-1567986954163-99ce2f792962"
      },
      {
        "reviewId": 14,
        "url": "https://images.unsplash.com/photo-1568219664569-7718b59734cd"
      },
      {
        "reviewId": 15,
        "url": "https://images.unsplash.com/photo-1568602471128-d37bdad47986"
      },
      {
        "reviewId": 16,
        "url": "https://images.unsplash.com/photo-1568695481371-276ec5f8cb6d"
      },
      {
        "reviewId": 17,
        "url": "https://images.unsplash.com/photo-1569507529708-45789d7e02e9"
      },
      {
        "reviewId": 18,
        "url": "https://images.unsplash.com/photo-1570006161795-d8ab0f0e8ab6"
      },
      {
        "reviewId": 19,
        "url": "https://images.unsplash.com/photo-1570367207222-e39c87c80d53"
      },
      {
        "reviewId": 20,
        "url": "https://images.unsplash.com/photo-1570423876483-d3d76263f2f8"
      },])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1,2,3] }
     }, {});
  }
};
