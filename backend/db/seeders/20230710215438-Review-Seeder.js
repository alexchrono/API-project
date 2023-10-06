'use strict';
const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
// /** @type {import('sequelize-cli').Migration} */
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
     *
    */
    //40 long

    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const allReviews=[
      [
      {
        "review": "Terrible experience, would never go back!",
        "stars": 1
      },
      {
        "review": "Horrible stay, regret booking this place!",
        "stars": 1
      },
      {
        "review": "Awful location, not as advertised!",
        "stars": 1
      },
      {
        "review": "Disappointing trip, wouldn't recommend it!",
        "stars": 2
      },
      {
        "review": "Worst vacation ever, don't waste your money!",
        "stars": 1
      },
      {
        "review": "Dreadful spot, had a terrible time!",
        "stars": 1
      },
      {
        "review": "Unpleasant experience, stay away!",
        "stars": 1
      },
      {
        "review": "Regrettable stay, not worth the price!",
        "stars": 2
      },
      {
        "review": "Disgusting place, cleanliness was lacking!",
        "stars": 1
      },
      {
        "review": "Horrifying stay, felt unsafe!",
        "stars": 1
      },
      {
        "review": "Absolutely terrible, the worst choice!",
        "stars": 1
      },
      {
        "review": "Nightmarish location, avoid at all costs!",
        "stars": 1
      },
      {
        "review": "Disastrous trip, ruined my vacation!",
        "stars": 1
      },
      {
        "review": "Appalling spot, false advertising!",
        "stars": 2
      },
      {
        "review": "Dismal experience, a big disappointment!",
        "stars": 1
      },
      {
        "review": "Regretful stay, had a bad time!",
        "stars": 1
      },
      {
        "review": "Atrocious place, avoid like the plague!",
        "stars": 1
      },
      {
        "review": "Miserable vacation, worst decision ever!",
        "stars": 1
      },
      {
        "review": "Horrific spot, a complete letdown!",
        "stars": 1
      },
      {
        "review": "Dreadful experience, stay far away!",
        "stars": 2
      },
      {
        "review": "Absolutely horrendous, a total nightmare!",
        "stars": 1
      },
      {
        "review": "Disastrous stay, I wouldn't wish it on anyone!",
        "stars": 1
      },
      {
        "review": "Terrible location, a complete disappointment!",
        "stars": 1
      },
      {
        "review": "Appalling trip, it was a disaster from start to finish!",
        "stars": 2
      },
      {
        "review": "Worst experience ever, I'm still traumatized!",
        "stars": 1
      },
      {
        "review": "Dreadful spot, a nightmare come true!",
        "stars": 1
      },
      {
        "review": "Unbearable stay, I wanted to leave immediately!",
        "stars": 1
      },
      {
        "review": "Regrettable vacation, it ruined everything!",
        "stars": 2
      },
      {
        "review": "Horrifying place, I've never been more disappointed!",
        "stars": 1
      },
      {
        "review": "Complete disaster, I couldn't believe how bad it was!",
        "stars": 1
      },
      {
        "review": "Absolutely awful, I had the worst time of my life!",
        "stars": 1
      },
      {
        "review": "Nightmarish location, it felt like a horror movie!",
        "stars": 1
      },
      {
        "review": "Catastrophic trip, it was beyond terrible!",
        "stars": 1
      },
      {
        "review": "Shocking spot, nothing was as promised!",
        "stars": 2
      },
      {
        "review": "Hugely disappointing, it was a big letdown!",
        "stars": 1
      },
      {
        "review": "Regretful experience, I wish I never went!",
        "stars": 1
      },
      {
        "review": "Atrocious place, I wouldn't recommend it to my worst enemy!",
        "stars": 1
      },
      {
        "review": "Absolutely miserable, it was a complete disaster!",
        "stars": 1
      },
      {
        "review": "Horrific vacation, it was a nightmare on every level!",
        "stars": 1
      },
      {
        "review": "Dismal spot, I'll never forget how bad it was!",
        "stars": 2
      }
    ],
    [
      {
        "review": "The location was pretty, but the neighbors creeped me out!",
        "stars": 3
      },
      {
        "review": "It was okay, nothing to write home about.",
        "stars": 3
      },
      {
        "review": "Average spot, didn't really stand out.",
        "stars": 3
      },
      {
        "review": "Decent place, but nothing special.",
        "stars": 3
      },
      {
        "review": "Not bad, but not great either.",
        "stars": 3
      },
      {
        "review": "Middle of the road experience, nothing remarkable.",
        "stars": 3
      },
      {
        "review": "Meh. Expected more for the price.",
        "stars": 3
      },
      {
        "review": "It was alright, but I've seen better.",
        "stars": 3
      },
      {
        "review": "So-so spot, wouldn't go out of my way to recommend.",
        "stars": 3
      },
      {
        "review": "Average accommodations, nothing to rave about.",
        "stars": 3
      },
      {
        "review": "Mediocre at best, wouldn't stay here again.",
        "stars": 3
      },
      {
        "review": "Not the worst, but far from the best.",
        "stars": 3
      },
      {
        "review": "Just an average place, didn't leave a lasting impression.",
        "stars": 3
      },
      {
        "review": "Nothing to write home about, pretty forgettable.",
        "stars": 3
      },
      {
        "review": "Eh, it was okay, I guess.",
        "stars": 3
      },
      {
        "review": "3 stars for being average.",
        "stars": 3
      },
      {
        "review": "Not terrible, but not great either.",
        "stars": 3
      },
      {
        "review": "Fairly unremarkable, wouldn't come back.",
        "stars": 3
      },
      {
        "review": "Middle of the road spot, nothing special.",
        "stars": 3
      },
      {
        "review": "Averagely satisfactory, but not exceptional.",
        "stars": 3
      },

      {
        "review": "The view was decent, but the room felt cramped.",
        "stars": 3
      },
      {
        "review": "It was just average, nothing to get excited about.",
        "stars": 3
      },
      {
        "review": "Mediocre spot, it didn't leave a lasting impression.",
        "stars": 3
      },
      {
        "review": "Fair accommodations, but I've seen better.",
        "stars": 3
      },
      {
        "review": "Not great, not terrible, just meh.",
        "stars": 3
      },
      {
        "review": "Average experience, nothing to write home about.",
        "stars": 3
      },
      {
        "review": "It was okay, but I expected more.",
        "stars": 3
      },
      {
        "review": "Decent at best, wouldn't go out of my way to recommend.",
        "stars": 3
      },
      {
        "review": "So-so spot, not much to rave about.",
        "stars": 3
      },
      {
        "review": "Mediocre accommodations, I've stayed in better places.",
        "stars": 3
      },
      {
        "review": "Average at its core, nothing particularly impressive.",
        "stars": 3
      },
      {
        "review": "Not terrible, but far from exceptional.",
        "stars": 3
      },
      {
        "review": "Just an ordinary place, nothing special.",
        "stars": 3
      },
      {
        "review": "Forgettable, it didn't stand out in any way.",
        "stars": 3
      },
      {
        "review": "Eh, it was average, I suppose.",
        "stars": 3
      },
      {
        "review": "3 stars for being squarely in the middle.",
        "stars": 3
      },
      {
        "review": "Not great, but not awful either.",
        "stars": 3
      },
      {
        "review": "Decidedly unremarkable, wouldn't return.",
        "stars": 3
      },
      {
        "review": "Middle of the road, without any standout features.",
        "stars": 3
      },
      {
        "review": "Average satisfaction, but not much more.",
        "stars": 3
      },
    ],
    [
      {
        "review": "Incredible spot, will definitely come back!",
        "stars": 5
      },
      {
        "review": "Amazing experience, exceeded expectations!",
        "stars": 4
      },
      {
        "review": "Lovely place, would recommend to anyone!",
        "stars": 5
      },
      {
        "review": "Exceptional spot, a hidden gem!",
        "stars": 5
      },
      {
        "review": "Fantastic stay, felt like a dream!",
        "stars": 4
      },
      {
        "review": "Absolutely perfect, couldn't ask for more!",
        "stars": 5
      },
      {
        "review": "Charming location, will visit again!",
        "stars": 4
      },
      {
        "review": "Outstanding experience, worth every penny!",
        "stars": 5
      },
      {
        "review": "Magical place, a true paradise!",
        "stars": 5
      },
      {
        "review": "Incredible spot, will definitely come back!",
        "stars": 5
      },
      {
        "review": "Amazing experience, exceeded expectations!",
        "stars": 4
      },
      {
        "review": "Lovely place, would recommend to anyone!",
        "stars": 5
      },
      {
        "review": "Exceptional spot, a hidden gem!",
        "stars": 5
      },
      {
        "review": "Fantastic stay, felt like a dream!",
        "stars": 4
      },
      {
        "review": "Absolutely perfect, couldn't ask for more!",
        "stars": 5
      },
      {
        "review": "Charming location, will visit again!",
        "stars": 4
      },
      {
        "review": "Outstanding experience, worth every penny!",
        "stars": 5
      },
      {
        "review": "Magical place, a true paradise!",
        "stars": 5
      },
      {
        "review": "Incredible spot, will definitely come back!",
        "stars": 5
      },
      {
        "review": "Amazing experience, exceeded expectations!",
        "stars": 4
      },
      {
        "review": "Lovely place, would recommend to anyone!",
        "stars": 5
      },
      {
        "review": "Exceptional spot, a hidden gem!",
        "stars": 5
      },
      {
        "review": "Fantastic stay, felt like a dream!",
        "stars": 4
      },
      {
        "review": "Absolutely perfect, couldn't ask for more!",
        "stars": 5
      },
      {
        "review": "Charming location, will visit again!",
        "stars": 4
      },
      {
        "review": "Amazing place, exceeded our expectations!",
        "stars": 5
      },
      {
        "review": "Incredible experience, a true gem!",
        "stars": 5
      },
      {
        "review": "Perfect getaway, will definitely return!",
        "stars": 4
      },
      {
        "review": "Lovely spot, had a fantastic time!",
        "stars": 4
      },
      {
        "review": "Exceptional stay, worth every penny!",
        "stars": 5
      },
      {
        "review": "A dream come true, highly recommended!",
        "stars": 5
      },
      {
        "review": "Charming retreat, felt like paradise!",
        "stars": 4
      },
      {
        "review": "Fantastic place, can't wait to visit again!",
        "stars": 5
      },
      {
        "review": "Unforgettable experience, a must-visit!",
        "stars": 5
      },
      {
        "review": "Beautiful location, made great memories!",
        "stars": 4
      },
      {
        "review": "Outstanding spot, couldn't ask for better!",
        "stars": 5
      },
      {
        "review": "Wonderful stay, will cherish the memories!",
        "stars": 5
      },
      {
        "review": "Great escape, felt like a paradise!",
        "stars": 4
      },
      {
        "review": "Scenic beauty, a dreamy retreat!",
        "stars": 4
      },
      {
        "review": "Incredible getaway, will come back for sure!",
        "stars": 5
      },
    ]
  ]

  for (let i=1;i<26;i++){

    for (let k=1;k<51;k++){
      if (i===k){
        continue
      }
      else {
      const reviewPicked=allReviews[randInt(0,2)][randInt(0,39)]
      const randReview=  {
        "spotId": k,
        "userId": i,
        "review": reviewPicked.review,
        "stars": reviewPicked.stars
      }
      await Review.create(randReview,{ validate: true })
    }

  }
  }
  },

  async down(queryInterface, Sequelize) {
    try {
      options.tableName = 'Reviews';
      const Op = Sequelize.Op;
      await Review.destroy({ where: {} });
    } catch (error) {
      console.error('Error while deleting seed data:', error);
    }
  }
