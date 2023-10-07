'use strict';
const { SpotImage } = require('../models/');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 1; i < 51; i++) {
      let randSpotImages = [];

      for (let k = 1; k < 8; k++) {
        let randSpotImage;

        if (k === 1) {
          randSpotImage = {
            "spotId": i,
            "url": `/public/seederSpots/exterior/img_${i}.jpg`,
            "preview": true
          };
        } else if (k > 1 && k < 7) {
          randSpotImage = {
            "spotId": i,
            "url": `/public/seederSpots/${i}/img_${k - 1}.jpg`,
            "preview": false
          };
        } else {
          randSpotImage = {
            "spotId": i,
            "url": `/public/seederSpots/${i}/staticmap.jpg`,
            "preview": false
          };
        }

        randSpotImages.push(randSpotImage);
      }

      await SpotImage.bulkCreate(randSpotImages, { validate: true });
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      options.tableName = 'SpotImages';
      const Op = Sequelize.Op;
      await SpotImage.destroy({ where: {} });
    } catch (error) {
      console.error('Error while deleting seed data:', error);
    }
  }
};
