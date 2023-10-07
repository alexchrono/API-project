'use strict';
// /** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");


function fake_price(){
    num1 = randInt(200, 600)
    num2 = randInt(10, 99)
    return parseFloat(`${num1}.${num2}`)
}
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

const seychellesCities = [
  "Victoria",
  "Anse Boileau",
  "Anse Etoile",
  "Anse Royale",
  "Baie Lazare",
  "Baie Sainte Anne",
  "Beau Vallon",
  "Bel Air",
  "Bel Ombre",
  "Cascade",
  "Glacis",
  "Grand' Anse Mahe",
  "Grand' Anse Praslin",
  "La Digue",
  "La Riviere Anglaise",
  "Mont Buxton",
  "Mont Fleuri",
  "Plaisance",
  "Pointe La Rue",
  "Port Glaud",
  "Saint Louis",
  "Takamaka"
];

const SeychellesStreetNames = [
  "Palm Avenue",
  "Ocean Drive",
  "Victoria Way",
  "Tropical Lane",
  "Coral Road",
  "Sunset Boulevard",
  "Island Street",
  "Turtle Crossing",
  "Mango Tree Lane",
  "Beau Vallon Road",
  "Pirate's Cove",
  "Seashell Street",
  "Blue Lagoon Drive",
  "Hibiscus Avenue",
  "Paradise Lane",
  "Sandy Beach Road",
  "Crystal Waters Drive",
  "Dolphin Street",
  "Papaya Parkway",
  "Starfish Street",
  "Coconut Drive",
  "Pearl Road",
  "Mermaid Avenue",
  "Nautilus Street",
  "Rainforest Lane",
  "Wavecrest Boulevard",
  "Orchid Road",
  "Golden Sands Drive",
  "Lighthouse Lane",
  "Marina Street",
  "Harbor View Road",
  "Tropicbird Avenue",
  "Seychelles Circle",
  "Granite Way",
  "Cinnamon Street",
  "Banyan Boulevard",
  "Moonbeam Drive",
  "Treasure Cove",
  "Sapphire Street",
  "Spice Route Lane",
  "Mahé Way",
  "Praslin Path",
  "Frigate Avenue",
  "Manta Ray Road",
  "Cascade Street",
  "Eden Island Drive",
  "Creole Lane",
  "Seychellois Street",
  "Pirate Bay Path",
  "Reef Road"
];

const MaldivesCities = [
  "Malé",
  "Addu City",
  "Fuvahmulah",
  "Kulhudhuffushi",
  "Thinadhoo",
  "Naifaru",
  "Dhidhdhoo",
  "Eydhafushi",
  "Felidhoo",
  "Funadhoo",
  "Gan",
  "Hithadhoo",
  "Hulhumalé",
  "Kudahuvadhoo",
  "Magoodhoo",
  "Mahibadhoo",
  "Manadhoo",
  "Maroshi",
  "Muli",
  "Rasdhoo",
  "Thulusdhoo",
  "Ungoofaaru",
  "Veymandoo",
  "Vilufushi",
  "Villingili"
];

const MaldivesStreetNames = [
  "Majeedhee Magu",
  "Ameenee Magu",
  "Chandhanee Magu",
  "Janavaree Magu",
  "Medhuziyaaraiy Magu",
  "Fareedhee Magu",
  "Husnuheena Magu",
  "Neelofaru Magu",
  "Orchid Magu",
  "Buruzu Magu",
  "Dhunburi Magu",
  "Hilaalee Magu",
  "Jasmin Magu",
  "Kanba Aisa Rani Hingun",
  "Lily Magu",
  "Lotus Magu",
  "Marine Drive",
  "Nikagas Magu",
  "Orchid Magu",
  "Palm Rose Magu",
  "Reefside Magu",
  "Sosun Magu",
  "Thazmeel Magu",
  "Violet Magu",
  "Zaika Magu"
];

const BoraBoraCities = [
  "Vaitape",
  "Anau",
  "Fa'anui",
  "Matira",
  "Nunue",
  "St. Regis Resort",
  "Four Seasons Resort",
  "Bora Bora Pearl Beach Resort",
  "Conrad Bora Bora Nui",
  "InterContinental Bora Bora Resort",
  "Motu Tapu",
  "Mount Otemanu",
  "Coral Gardens",
  "Bora Bora Lagoonarium",
  "Matira Point",
  "Matira Beach",
  "Motu Mute"
];

const BoraBoraStreetNames = [
  "Vaitape Quay",
  "Rue du Général de Gaulle",
  "Avenue Prince Hinoi",
  "Avenue Tuaroto",
  "Rue de la Plage Matira",
  "Avenue des Palmiers",
  "Rue du Lagon Bleu",
  "Chemin des Hibiscus",
  "Allée des Tortues",
  "Boulevard des Alizés",
  "Rue du Soleil Levant",
  "Chemin de la Brise Marine",
  "Avenue des Étoiles",
  "Rue des Dauphins",
  "Boulevard du Corail",
  "Chemin des Orchidées",
  "Avenue de la Lune",
  "Rue des Récifs",
  "Boulevard de la Mer",
  "Allée des Perroquets",
  "Chemin des Cascades",
  "Rue de l'Horizon",
  "Boulevard des Sirènes",
  "Rue du Paradis",
  "Avenue des Vagues",
  "Allée des Anémones",
  "Chemin des Coquillages",
  "Rue de la Marée",
  "Avenue Tropicale",
  "Rue des Lagons",
  "Boulevard des Flamboyants"
];


const placeNames = [
  "Bay",
  "Atoll",
  "Isle",
  "Lagoon",
  "Cove",
  "Beach",
  "Archipelago",
  "Peninsula",
  "Retreat",
  "Bungalow",
  "Harbor",
  "Tides",
  "Palm",
  "Haven",
  "Shoals",
  "Dunes",
  "Reef",
  "Cabana",
  "Hut",
  "Lodge",
  "Shore",
  "Mangrove",
  "Jetty",
  "Island",
  "Tropics",
  "Estuary",
  "Surf",
  "Keys",
  "Oasis",
  "Delta",
  "Coral",
  "Sanctuary",
  "Palms",
  "Waves",
  "Bar",
  "Inlet",
  "Sound",
  "Cape",
  "Bluff",
  "Strait",
  "Cay",
  "Pier",
  "Anchor",
  "Riviera",
  "Sandbar",
  "Vista",
  "Deck",
  "Waterfront",
  "Horizon"
];




const placeAdj = [
  "Coral",
  "Sunny",
  "Starfish",
  "Azure",
  "Golden",
  "Palm",
  "Tropical",
  "Breezy",
  "Paradise",
  "Lagoon",
  "Island",
  "Exotic",
  "Turquoise",
  "Mango",
  "Pineapple",
  "Sandy",
  "Beachfront",
  "Seaside",
  "Crystal",
  "Oceanic",
  "Wave",
  "Barefoot",
  "Coastal",
  "Tiki",
  "Seashell",
  "Hammock",
  "Cabana",
  "Surf",
  "Cove",
  "Papaya",
  "Beachy",
  "Dolphin",
  "Margarita",
  "Hibiscus",
  "Cerulean",
  "Mermaid",
  "Nautical",
  "Jungle",
  "Tidal",
  "Sail",
  "Driftwood",
  "Lush",
  "Marina",
  "Sunrise",
  "Sunset",
  "Pier",
  "Reef"
];

const desc1 = [
  "Ocean paradise",
  "Tropical retreat",
  "Sun-kissed haven",
  "Azure beachfront",
  "Seaside sanctuary",
  "Palm-fringed escape",
  "Island hideaway",
  "Lagoon-side abode",
  "Beach bungalow",
  "Crystal water oasis",
  "Golden sand getaway",
  "Exotic island resort",
  "Lush tropical villa",
  "Majestic coastal lodge",
  "Barefoot paradise",
  "Wave-kissed sanctuary",
  "Turquoise water haven",
  "Sunny beach resort",
  "Coral reef retreat",
  "Tropical cabana",
  "Swaying palm escape",
  "Island luxury",
  "Whitewashed villa",
  "Nautical charm resort",
  "Beachfront elegance",
  "Oceanic splendor",
  "Tropical canopy retreat",
  "Hammock-filled hideaway",
  "Starfish beach bungalow",
  "Tiki hut paradise",
  "Mango grove resort",
  "Coco palm villa",
  "Seashell beach abode",
  "Sundrenched paradise",
  "Hibiscus bloom haven",
  "Surfside retreat",
  "Tidal charm resort",
  "Exquisite atoll escape",
  "Beach hammock haven",
  "Tidal pool sanctuary",
  "Pineapple grove villa",
  "Tropical bloom resort",
  "Sunset beach abode",
  "Beachcomber's hideaway",
  "Seabreeze-filled sanctuary",
  "Surfer's paradise",
  "Coral-fringed getaway",
  "Mermaid's cove resort",
  "Whispering palm escape",
  "Lagoon lap luxury"
];

const desc2 = [
  "relaxing beaches",
  "pristine coral reefs",
  "breathtaking sunsets",
  "luxurious spa treatments",
  "crystal-clear waters",
  "vibrant marine life",
  "exotic local cuisine",
  "watersport adventures",
  "warm ocean breezes",
  "lush tropical gardens",
  "private beach access",
  "moonlit walks by the shore",
  "swaying hammocks",
  "dolphin-watching excursions",
  "fragrant frangipani trees",
  "intimate candlelit dinners",
  "calm, turquoise lagoons",
  "beachfront yoga sessions",
  "traditional island music nights",
  "freshly caught seafood",
  "tiki torch-lit pathways",
  "coconut grove views",
  "captivating sea views",
  "tranquil infinity pools",
  "overwater bungalow stays",
  "serene boat rides",
  "local artisanal crafts",
  "sunkissed mornings",
  "midnight swims",
  "beach bonfire evenings",
  "shaded cabana lounges",
  "vibrant snorkeling spots",
  "sultry island nights",
  "endless horizons",
  "private island picnics",
  "underwater diving excursions",
  "colorful beachfront markets",
  "tropical rainforest treks",
  "freshly blended piña coladas",
  "sizzling beach barbecues",
  "tranquil morning meditations",
  "salted ocean air",
  "passionate salsa nights",
  "soft white sands",
  "tropical birdwatching mornings",
  "balmy sea breezes",
  "glistening tidal pools",
  "authentic islander hospitality",
  "gorgeous sea vistas"
];




function fakePrice() {
  const num1 = randInt(600, 2500);
  const num2 = .00;
  return parseFloat(`${num1}.00`);
}

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
let allSpotsToMake=[]
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 1; i < 151; i++) {
      let randSpot
      if (i<=51){
        randSpot = {
        "ownerId": randInt(1, 25),
        "address": `${randInt(10000,99990)} ${SeychellesStreetNames[randInt(0,48)]}`,
        "city": seychellesCities[randInt(0,20)],
        "state": 'Seychelles',
        "country": "Seychelles",
        "lat": -4.6796+randInt(1,5),
        "lng": 55.4920+randInt(1,4),
        "name": uV(new Set(), () => `${placeAdj[randInt(0, 48)]} ${placeNames[randInt(0, 48)]}`),
        "description": uV(new Set(), () => `${desc1[randInt(0, 48)]} with ${desc2[randInt(0, 48)]}`),
        "price": fakePrice()
      };
    }

    else if (i>51 && i<=101){
      randSpot = {
        "ownerId": randInt(1, 25),
        "address": `${randInt(10000,99990)} ${MaldivesStreetNames[randInt(0,23)]}`,
        "city": MaldivesCities[randInt(0,23)],
        "state": 'Maldives',
        "country": "Maldives",
        "lat": 3.2028+randInt(1,5),
        "lng": 73.2207+randInt(1,4),
        "name": uV(new Set(), () => `${placeAdj[randInt(0, 48)]} ${placeNames[randInt(0, 48)]}`),
        "description": uV(new Set(), () => `${desc1[randInt(0, 48)]} with ${desc2[randInt(0, 48)]}`),
        "price": fakePrice()
      };

    }
    else {
      randSpot = {
        "ownerId": randInt(1, 25),
        "address": `${randInt(10000,99990)} ${BoraBoraStreetNames[randInt(0,29)]}`,
        "city": BoraBoraCities[randInt(0,16)],
        "state": 'Bora Bora,French Polynesia',
        "country": "France",
        "lat": 3.2028+randInt(1,5),
        "lng": 73.2207+randInt(1,4),
        "name": uV(new Set(), () => `${placeAdj[randInt(0, 48)]} ${placeNames[randInt(0, 48)]}`),
        "description": uV(new Set(), () => `${desc1[randInt(0, 48)]} with ${desc2[randInt(0, 48)]}`),
        "price": fakePrice()
      };

    }
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
