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
    let allReviewImages=[]
    for (let user=1;user<26;user++){
      for (let review=1;review<51;review++){
        let review={
          "reviewId": review,
          "url": `/public/seederSpots/reviewImages/img_${user}.jpg`
        }
        allReviewImages.push(review)
      }
    }
    await ReviewImage.bulkCreate(allReviewImages,{ validate: true })

  },

  async down(queryInterface, Sequelize) {
    try {
      options.tableName = 'ReviewImages';
      const Op = Sequelize.Op;
      await ReviewImage.destroy({ where: {} });
    } catch (error) {
      console.error('Error while deleting seed data:', error);
    }
  }
};
