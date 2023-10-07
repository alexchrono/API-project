'use strict';
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");
const faker = require('faker');

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uV(set, fakerFunc) {
  let value;
  while (true) {
    value = fakerFunc();
    if (!set.has(value)) {
      set.add(value);
      return value;
    }
  }
}

function randLat() {
  return randInt(-90, 90) + Math.random().toFixed(4);
}

function randLong() {
  return randInt(-180, 180) + Math.random().toFixed(4);
}

const placeNames = [
  "Point",
  "Manor",
  "Hideaway",
  "Bungalow",
  "Retreat",
  "Cottage",
  "Estate",
  "Haven",
  "Mansion",
  "Villa",
  "Resort",
  "Lodge",
  "Sanctuary",
  "Palace",
  "Meadow",
  "Gardens",
  "Ridge",
  "Hillside",
  "Cabin",
  "Oasis",
  "Paradise",
  "Domain",
  "Nook",
  "Hacienda",
  "Domain",
  "Springs",
  "Acres",
  "Village",
  "Quarters",
  "Nirvana",
  "Terrace",
  "Chateau",
  "Canyon",
  "Cove",
  "Vineyard",
  "Pines",
  "Woods",
  "Maze",
  "Hollow",
  "Henge"
];

const placeAdj = [
  "Serenity",
  "Serene",
  "Humble",
  "Tranquil",
  "Picturesque",
  "Rustic",
  "Quaint",
  "Scenic",
  "Idyllic",
  "Charming",
  "Enchanting",
  "Majestic",
  "Breathtaking",
  "Cozy",
  "Secluded",
  "Peaceful",
  "Lush",
  "Hidden",
  "Historic",
  "Mystical",
  "Splendid",
  "Panoramic",
  "Verdant",
  "Tranquility",
  "Elegant",
  "Dreamy",
  "Calm",
  "Delightful",
  "Radiant",
  "Romantic",
  "Inviting",
  "Pristine",
  "Enigmatic",
  "Spectacular",
  "Heavenly",
  "Awe-Inspiring",
  "Enchanted",
  "Soothing",
  "Harmonious"
];

const desc1 = [
  "Serene getaway",
  "Cozy retreat",
  "Tranquil hideaway",
  "Picturesque escape",
  "Rustic cabin",
  "Charming cottage",
  "Secluded oasis",
  "Peaceful haven",
  "Historic charm",
  "Enchanting lodge",
  "Scenic beauty",
  "Elegant mansion",
  "Inviting home",
  "Spectacular views",
  "Heavenly haven",
  "Harmonious abode",
  "Enigmatic retreat",
  "Soothing ambiance",
  "Radiant quarters",
  "Quaint village",
  "Nirvana sanctuary",
  "Tranquility haven",
  "Delightful stay",
  "Pristine accommodations",
  "Hidden gem",
  "Calm escape",
  "Idyllic location",
  "Spectacular panorama",
  "Lush surroundings",
  "Modern comfort",
  "Urban elegance",
  "Relaxing space",
  "Cultural experiences",
  "Vibrant neighborhood",
  "Artistic ambiance",
  "Bohemian charm",
  "Stunning views",
  "Luxury retreat",
  "Natural beauty",
  "Urban oasis",
  "Quaint charm",
];

const desc2 = [
  "Breathtaking views.",
  "Nearby pool.",
  "Clean quarters.",
  "Divine air conditioning.",
  "Hometown feel.",
  "Private balcony.",
  "Luxurious amenities.",
  "Gourmet cuisine.",
  "Secluded location.",
  "Relaxing atmosphere.",
  "Friendly staff.",
  "Scenic surroundings.",
  "Cozy fireplace.",
  "Charming decor.",
  "Spacious rooms.",
  "Outdoor activities.",
  "Tranquil gardens.",
  "Mountain vistas.",
  "Historic charm.",
  "Modern comforts.",
  "Peaceful ambiance.",
  "Spectacular sunsets.",
  "Picturesque landscapes.",
  "Lakeside setting.",
  "Enchanting views.",
  "Natural beauty.",
  "Fine dining.",
  "Romantic setting.",
  "Family-friendly.",
  "Adventure nearby.",
  "Stunning architecture.",
  "Soothing spa.",
  "Golf course access.",
  "Hiking trails.",
  "Cultural experiences.",
  "Wildlife encounters.",
  "Relaxing massages.",
  "Outdoor adventures."
];

function fakePrice() {
  const num1 = randInt(50, 300);
  const num2 = randInt(10, 99);
  return parseFloat(`${num1}.${num2}`);
}

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
let allSpotsToMake=[]
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 1; i < 51; i++) {
      let randSpot = {
        "ownerId": uV(randInt(1, 25), faker.random.number),
        "address": uV(new Set(), faker.address.streetAddress),
        "city": faker.address.city(),
        "state": faker.address.state(),
        "country": "USA",
        "lat": randLat(),
        "lng": randLong(),
        "name": uV(new Set(), () => `${placeAdj[randInt(0, 39)]} ${placeNames[randInt(0, 39)]}`),
        "description": uV(new Set(), () => `${desc1[randInt(0, 39)]} ${desc2[randInt(0, 39)]}`),
        "price": fakePrice()
      };
      allSpotsToMake.push(randSpot)
    }

    await Spot.bulkCreate(allSpotsToMake, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    try {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
      await Spot.destroy({ where: {} });
    } catch (error) {
      console.error('Error while deleting seed data:', error);
    }
  }
};
