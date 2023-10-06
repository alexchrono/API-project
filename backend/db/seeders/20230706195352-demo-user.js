'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        id: 1,
        email: 'demo@user.io',
        username: 'DemoUser1',
        firstName: 'John',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,
        email: 'adventurelover@example.com',
        username: 'VacationLover26',
        firstName: 'Tyrone',
        lastName: 'Yeeee',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 3,
        email: 'beachparadise@example.com',
        username: 'BeachBum2023',
        firstName: 'Deuce',
        lastName: 'Bigalow',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 4,
        email: 'sunnyday@example.com',
        username: 'SunnyBeach45',
        firstName: 'Alice',
        lastName: 'Johnson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 5,
        email: 'mountainhike@example.com',
        username: 'MountainHiker17',
        firstName: 'Bob',
        lastName: 'Adams',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 6,
        email: 'cityexplorer@example.com',
        username: 'CityExplorer88',
        firstName: 'Eva',
        lastName: 'Wilson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 7,
        email: 'wildnature@example.com',
        username: 'WildNatureLover71',
        firstName: 'Alex',
        lastName: 'Brown',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 8,
        email: 'artistictravel@example.com',
        username: 'ArtisticTraveler19',
        firstName: 'Grace',
        lastName: 'Taylor',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 9,
        email: 'gourmetadventurer@example.com',
        username: 'GourmetAdventurer32',
        firstName: 'Oliver',
        lastName: 'Davis',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 10,
        email: 'beachcomber@example.com',
        username: 'Beachcomber55',
        firstName: 'Luna',
        lastName: 'Clark',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 11,
        email: 'skilover@example.com',
        username: 'SkiLover42',
        firstName: 'Finn',
        lastName: 'Miller',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 12,
        email: 'adrenalinejunkie@example.com',
        username: 'AdrenalineJunkie77',
        firstName: 'Mia',
        lastName: 'Garcia',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 13,
        email: 'yogaenthusiast@example.com',
        username: 'YogaEnthusiast21',
        firstName: 'Leo',
        lastName: 'Hernandez',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 14,
        email: 'roadtripper@example.com',
        username: 'RoadTripper13',
        firstName: 'Sophia',
        lastName: 'Martinez',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 15,
        email: 'globetrotter@example.com',
        username: 'GlobeTrotter67',
        firstName: 'Ava',
        lastName: 'Lopez',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 16,
        email: 'adventureseeker@example.com',
        username: 'AdventureSeeker39',
        firstName: 'Lucas',
        lastName: 'Perez',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 17,
        email: 'beachvibes@example.com',
        username: 'BeachVibes22',
        firstName: 'Lily',
        lastName: 'Rivera',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 18,
        email: 'hikingenthusiast@example.com',
        username: 'HikingEnthusiast18',
        firstName: 'Logan',
        lastName: 'Wright',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 19,
        email: 'wanderlust@example.com',
        username: 'WanderlustTraveler55',
        firstName: 'Ethan',
        lastName: 'Harris',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 20,
        email: 'naturelover@example.com',
        username: 'NatureLover23',
        firstName: 'Aria',
        lastName: 'Lee',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 21,
        email: 'sunsetchaser@example.com',
        username: 'SunsetChaser47',
        firstName: 'Mason',
        lastName: 'Green',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 22,
        email: 'musicfestival@example.com',
        username: 'MusicFestivalJunkie38',
        firstName: 'Sophie',
        lastName: 'Brown',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 23,
        email: 'luxurytravel@example.com',
        username: 'LuxuryTraveler12',
        firstName: 'Jackson',
        lastName: 'Anderson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 24,
        email: 'outdoorexplorer@example.com',
        username: 'OutdoorExplorer76',
        firstName: 'Liam',
        lastName: 'Martin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 25,
        email: 'adventureawaits@example.com',
        username: 'AdventureAwaits33',
        firstName: 'Scarlett',
        lastName: 'Lewis',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    try {
      options.tableName = 'Users';
      const Op = Sequelize.Op;
      await User.destroy({ where: {} });
    } catch (error) {
      console.error('Error while deleting seed data:', error);
    }
  }

};
