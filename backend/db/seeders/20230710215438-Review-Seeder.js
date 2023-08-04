'use strict';
const { Review } = require('../models');
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
    await Review.bulkCreate([
      {
        "spotId": 1,
        "userId": 1,
        "review": "Terrible experience, wouldn't recommend it.",
        "stars": 1
      },
      {
        "spotId": 1,
        "userId": 2,
        "review": "It was just average, nothing special.",
        "stars": 2
      },
      {
        "spotId": 1,
        "userId": 3,
        "review": "Great spot, loved the view!",
        "stars": 4
      },
      {
        "spotId": 1,
        "userId": 1,
        "review": "Awesome place, will definitely come back!",
        "stars": 5
      },
      {
        "spotId": 2,
        "userId": 1,
        "review": "Not a good experience, wouldn't recommend.",
        "stars": 1
      },
      {
        "spotId": 2,
        "userId": 2,
        "review": "Decent place, could have been better.",
        "stars": 3
      },
      {
        "spotId": 2,
        "userId": 3,
        "review": "Enjoyed my stay, pleasant ambiance.",
        "stars": 4
      },
      {
        "spotId": 2,
        "userId": 1,
        "review": "Loved it! Amazing spot with great amenities.",
        "stars": 5
      },
      {
        "spotId": 3,
        "userId": 1,
        "review": "Worst place ever, avoid at all costs.",
        "stars": 1
      },
      {
        "spotId": 3,
        "userId": 2,
        "review": "It was alright, nothing special.",
        "stars": 2
      },
      {
        "spotId": 3,
        "userId": 3,
        "review": "Pretty good experience, enjoyed my time.",
        "stars": 4
      },
      {
        "spotId": 3,
        "userId": 1,
        "review": "Exceptional place, exceeded my expectations!",
        "stars": 5
      },
      {
        "spotId": 4,
        "userId": 2,
        "review": "Awful experience, would not recommend staying here.",
        "stars": 1
      },
      {
        "spotId": 4,
        "userId": 3,
        "review": "Not bad, but could be improved.",
        "stars": 2
      },
      {
        "spotId": 4,
        "userId": 1,
        "review": "Lovely spot, enjoyed the peaceful surroundings.",
        "stars": 4
      },
      {
        "spotId": 4,
        "userId": 2,
        "review": "Absolutely loved it! Perfect getaway location.",
        "stars": 5
      },
      {
        "spotId": 5,
        "userId": 3,
        "review": "Disappointing stay, had high expectations.",
        "stars": 1
      },
      {
        "spotId": 5,
        "userId": 1,
        "review": "Nice place, but lacked some amenities.",
        "stars": 3
      },
      {
        "spotId": 5,
        "userId": 2,
        "review": "Very pleasant experience, great service.",
        "stars": 4
      },
      {
        "spotId": 5,
        "userId": 3,
        "review": "Incredible spot, will definitely come back!",
        "stars": 5
      },
      {
        "spotId": 6,
        "userId": 1,
        "review": "Horrible stay, regret booking here.",
        "stars": 1
      },
      {
        "spotId": 6,
        "userId": 2,
        "review": "Just average, nothing special.",
        "stars": 2
      },
      {
        "spotId": 6,
        "userId": 3,
        "review": "Amazing spot, loved the ambiance!",
        "stars": 4
      },
      {
        "spotId": 6,
        "userId": 1,
        "review": "Awesome experience, will recommend to friends.",
        "stars": 5
      },
      {
        "spotId": 7,
        "userId": 3,
        "review": "Terrible place, avoid at all costs.",
        "stars": 1
      },
      {
        "spotId": 7,
        "userId": 1,
        "review": "Decent spot, could use some improvements.",
        "stars": 2
      },
      {
        "spotId": 7,
        "userId": 2,
        "review": "Had a pleasant stay, but nothing extraordinary.",
        "stars": 3
      },
      {
        "spotId": 7,
        "userId": 3,
        "review": "Great spot, loved the atmosphere!",
        "stars": 4
      },
      {
        "spotId": 8,
        "userId": 1,
        "review": "Not a good experience, wouldn't recommend.",
        "stars": 1
      },
      {
        "spotId": 8,
        "userId": 2,
        "review": "Average place, nothing special.",
        "stars": 2
      },
      {
        "spotId": 8,
        "userId": 3,
        "review": "Really enjoyed my stay, lovely view.",
        "stars": 4
      },
      {
        "spotId": 8,
        "userId": 1,
        "review": "Fantastic spot, everything was perfect!",
        "stars": 5
      },
      {
        "spotId": 9,
        "userId": 3,
        "review": "Horrible experience, wouldn't recommend staying here.",
        "stars": 1
      },
      {
        "spotId": 9,
        "userId": 1,
        "review": "Just an okay place, could have been better.",
        "stars": 2
      },
      {
        "spotId": 9,
        "userId": 2,
        "review": "Loved my stay, beautiful surroundings.",
        "stars": 4
      },
      {
        "spotId": 9,
        "userId": 3,
        "review": "Outstanding spot, highly recommended!",
        "stars": 5
      },
      {
        "spotId": 10,
        "userId": 2,
        "review": "Awful place, definitely avoid!",
        "stars": 1
      },
      {
        "spotId": 10,
        "userId": 3,
        "review": "Not bad, but had some issues.",
        "stars": 2
      },
      {
        "spotId": 10,
        "userId": 1,
        "review": "Enjoyed my stay, but room for improvement.",
        "stars": 3
      },
      {
        "spotId": 10,
        "userId": 2,
        "review": "Loved it! Great spot with excellent service.",
        "stars": 4
      },
      {
        "spotId": 11,
        "userId": 3,
        "review": "Disappointing experience, wouldn't recommend.",
        "stars": 1
      },
      {
        "spotId": 11,
        "userId": 1,
        "review": "Nice spot, but lacked some amenities.",
        "stars": 3
      },
      {
        "spotId": 11,
        "userId": 2,
        "review": "Very pleasant stay, loved the location.",
        "stars": 4
      },
      {
        "spotId": 11,
        "userId": 3,
        "review": "Incredible spot, will definitely come back!",
        "stars": 5
      },
      {
        "spotId": 12,
        "userId": 1,
        "review": "Horrible stay, regret booking here.",
        "stars": 1
      },
      {
        "spotId": 12,
        "userId": 2,
        "review": "Just average, nothing special.",
        "stars": 2
      },
      {
        "spotId": 12,
        "userId": 3,
        "review": "Amazing spot, loved the ambiance!",
        "stars": 4
      },
      {
        "spotId": 12,
        "userId": 1,
        "review": "Awesome experience, will recommend to friends.",
        "stars": 5
      },
       { validate: true }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.between]: [1,12] }
     }, {});
  }
};
