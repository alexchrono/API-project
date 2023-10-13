'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await User.bulkCreate([
            {
                id: 1,
                username: 'Demo-lition',
                firstName: 'John',
                lastName: 'Smith',
                email: 'demo@user.io',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 2,
                username: 'VacationLover26',
                firstName: 'Tyrone',
                lastName: 'Yeeee',
                email: 'adventurelover@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 3,
                username: 'BeachBum2023',
                firstName: 'Deuce',
                lastName: 'Bigalow',
                email: 'beachparadise@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 4,
                username: 'SunnyBeach45',
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'sunnyday@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 5,
                username: 'MountainHiker17',
                firstName: 'Bob',
                lastName: 'Adams',
                email: 'mountainhike@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 6,
                username: 'CityExplorer88',
                firstName: 'Eva',
                lastName: 'Wilson',
                email: 'cityexplorer@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 7,
                username: 'WildNatureLover71',
                firstName: 'Alex',
                lastName: 'Brown',
                email: 'wildnature@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 8,
                username: 'ArtisticTraveler19',
                firstName: 'Grace',
                lastName: 'Taylor',
                email: 'artistictravel@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 9,
                username: 'GourmetAdventurer32',
                firstName: 'Oliver',
                lastName: 'Davis',
                email: 'gourmetadventurer@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 10,
                username: 'Beachcomber55',
                firstName: 'Luna',
                lastName: 'Clark',
                email: 'beachcomber@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 11,
                username: 'SkiLover42',
                firstName: 'Finn',
                lastName: 'Miller',
                email: 'skilover@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 12,
                username: 'AdrenalineJunkie77',
                firstName: 'Mia',
                lastName: 'Garcia',
                email: 'adrenalinejunkie@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 13,
                username: 'YogaEnthusiast21',
                firstName: 'Leo',
                lastName: 'Hernandez',
                email: 'yogaenthusiast@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 14,
                username: 'RoadTripper13',
                firstName: 'Sophia',
                lastName: 'Martinez',
                email: 'roadtripper@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 15,
                username: 'GlobeTrotter67',
                firstName: 'Ava',
                lastName: 'Lopez',
                email: 'globetrotter@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 16,
                username: 'AdventureSeeker39',
                firstName: 'Lucas',
                lastName: 'Perez',
                email: 'adventureseeker@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 17,
                username: 'BeachVibes22',
                firstName: 'Lily',
                lastName: 'Rivera',
                email: 'beachvibes@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 18,
                username: 'HikingEnthusiast18',
                firstName: 'Logan',
                lastName: 'Wright',
                email: 'hikingenthusiast@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 19,
                username: 'WanderlustTraveler55',
                firstName: 'Ethan',
                lastName: 'Harris',
                email: 'wanderlust@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 20,
                username: 'NatureLover23',
                firstName: 'Aria',
                lastName: 'Lee',
                email: 'naturelover@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 21,
                username: 'SunsetChaser47',
                firstName: 'Mason',
                lastName: 'Green',
                email: 'sunsetchaser@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 22,
                username: 'MusicFestivalJunkie38',
                firstName: 'Sophie',
                lastName: 'Brown',
                email: 'musicfestival@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 23,
                username: 'LuxuryTraveler12',
                firstName: 'Jackson',
                lastName: 'Anderson',
                email: 'luxurytravel@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 24,
                username: 'OutdoorExplorer76',
                firstName: 'Liam',
                lastName: 'Martin',
                email: 'outdoorexplorer@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 25,
                username: 'AdventureAwaits33',
                firstName: 'Scarlett',
                lastName: 'Lewis',
                email: 'adventureawaits@example.com',
                hashedPassword: bcrypt.hashSync('password')
            },
        ], { validate: true });
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        await User.destroy({ where: {} });
    }
};
