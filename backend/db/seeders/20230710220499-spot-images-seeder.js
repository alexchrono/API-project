'use strict';
const { SpotImage } = require('../models/');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (let i = 1; i < 151; i++) {
      let randSpotImages = [];

      for (let k = 1; k < 8; k++) {
        let randSpotImage;

        if (k === 1) {
          randSpotImage = {
            "spotId": i,
            "url": `/seederSpots/exterior/img_${i}.jpg`,
            "preview": true
          };
        } else if (k >= 2 && k <= 6) {
          randSpotImage = {
            "spotId": i,
            "url": `/seederSpots/${i}/img_${k - 1}.jpg`,
            "preview": false
          };
        } else {
          if (i<=51 && k===7){
            randSpotImage= {
            "spotId": i,
            "url": `/seederSpots/seychellesLocation/img_${randInt(1,3)}.jpg`,
            "preview": false
            }
          }
          else if(i>=52 && i<=101 && k===7){
            randSpotImage= {
              "spotId": i,
              "url": `/seederSpots/MaldivesLocation/img_${randInt(1,3)}.jpg`,
              "preview": false
              }

          }
          else if (i>101 && k===7){
            randSpotImage= {
              "spotId": i,
              "url": `/seederSpots/BoraBoraLocation/img_${randInt(1,3)}.jpg`,
              "preview": false
              }

          }
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
