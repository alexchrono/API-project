'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true });
      Spot.hasMany(models.Review, { foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
     });
      //put on delete cascade and has hooks true here
     Spot.hasMany(models.Booking, { foreignKey: 'spotId',onDelete: 'CASCADE',
     hooks: true });
     //if you experience problems delete the ondeletecascadeabove
     const columnMapping = {
      through: 'Booking',
      foreignKey: 'spotId',
      otherKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true
     }
     Spot.belongsToMany(models.User, columnMapping);
     const columnMapping2 = {
      through: 'Review',
      otherKey: 'userId',
      foreignKey: 'spotId'
     }
    //  Spot.belongsToMany(models.User, columnMapping2);
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      reviews: {attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price']}
    }
  });
  return Spot;
};
