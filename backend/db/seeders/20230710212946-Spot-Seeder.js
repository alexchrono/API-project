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
        "ownerId": 1,
        "address": "1537 Longview Avenue",
        "city": "Atlanta",
        "state": "Georgia",
        "country": "USA",
        "lat": 33.7490,
        "lng": -84.3880,
        "name": "Serenity Point",
        "description": "Scenic spot with breathtaking views",
        "price": 17.34
      },
      {
        "ownerId": 1,
        "address": "1600 Shortridge Street",
        "city": "Spring Hill",
        "state": "Kansas",
        "country": "USA",
        "lat": 38.8816,
        "lng": -94.8191,
        "name": "Tranquil Retreat",
        "description": "Peaceful escape surrounded by nature",
        "price": 50.47
      },
      {
        "ownerId": 1,
        "address": "1300 Oakridge Drive",
        "city": "St. Louis",
        "state": "Missouri",
        "country": "USA",
        "lat": 37.7749,
        "lng": -122.4194,
        "name": "Hidden Haven",
        "description": "Secluded spot amidst lush greenery",
        "price": 50.47
      },
      {
        "ownerId": 2,
        "address": "1537 Longview Avenue",
        "city": "Atlanta",
        "state": "Georgia",
        "country": "USA",
        "lat": 33.7490,
        "lng": -84.3880,
        "name": "Sunset Vista",
        "description": "Gorgeous view of the setting sun",
        "price": 17.34
      },
      {
        "ownerId": 2,
        "address": "1600 Shortridge Street",
        "city": "Spring Hill",
        "state": "Kansas",
        "country": "USA",
        "lat": 38.8816,
        "lng": -94.8191,
        "name": "Nature's Haven",
        "description": "Surrounded by scenic beauty",
        "price": 50.47
      },
      {
        "ownerId": 2,
        "address": "1300 Oakridge Drive",
        "city": "St. Louis",
        "state": "Missouri",
        "country": "USA",
        "lat": 37.7749,
        "lng": -122.4194,
        "name": "Wilderness Retreat",
        "description": "Untamed beauty at its best",
        "price": 50.47
      },
      {
        "ownerId": 2,
        "address": "1537 Longview Avenue",
        "city": "Atlanta",
        "state": "Georgia",
        "country": "USA",
        "lat": 33.7490,
        "lng": -84.3880,
        "name": "Enchanted Grove",
        "description": "Magical spot filled with charm",
        "price": 17.34
      },
      {
        "ownerId": 3,
        "address": "1600 Shortridge Street",
        "city": "Spring Hill",
        "state": "Kansas",
        "country": "USA",
        "lat": 38.8816,
        "lng": -94.8191,
        "name": "Tranquility Retreat",
        "description": "Escape to serenity and calmness",
        "price": 50.47
      },
      {
        "ownerId": 3,
        "address": "1300 Oakridge Drive",
        "city": "St. Louis",
        "state": "Missouri",
        "country": "USA",
        "lat": 37.7749,
        "lng": -122.4194,
        "name": "Nature's Oasis",
        "description": "Harmony with nature at its finest",
        "price": 50.47
      },
      {
        "ownerId": 3,
        "address": "1537 Longview Avenue",
        "city": "Atlanta",
        "state": "Georgia",
        "country": "USA",
        "lat": 33.7490,
        "lng": -84.3880,
        "name": "Sunset Paradise",
        "description": "Awe-inspiring sunsets by the beach",
        "price": 17.34
      },
      {
        "ownerId": 3,
        "address": "1600 Shortridge Street",
        "city": "Spring Hill",
        "state": "Kansas",
        "country": "USA",
        "lat": 38.8816,
        "lng": -94.8191,
        "name": "Serenity Gardens",
        "description": "Tranquil gardens with blooming flowers",
        "price": 50.47
      },
      {
        "ownerId": 3,
        "address": "1300 Oakridge Drive",
        "city": "St. Louis",
        "state": "Missouri",
        "country": "USA",
        "lat": 37.7749,
        "lng": -122.4194,
        "name": "Whispering Pines",
        "description": "Gentle winds through the pine forest",
        "price": 50.47
      }
    ]
    , { validate: true });
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
