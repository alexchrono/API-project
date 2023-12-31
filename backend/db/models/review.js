'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId',
      onDelete: 'CASCADE',
      hooks: true });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
      Review.hasMany(models.SpotImage, {foreignKey: 'spotId',otherKey:'spotId'})
//       const columnMapping = {
//         through: 'Spot',
//  otherKey: 'id',
//  foreignKey: 'id'
//       }
//       Review.belongsToMany(models.SpotImage,columnMapping)
    }
  }
  Review.init({
    // id: {type:DataTypes.INTEGER,
    //   primaryKey: true,
    // autoIncrement:true},
    id: {type:DataTypes.INTEGER,
    primaryKey: true,
  autoIncrement: true,
allowNull:false},
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,

    stars: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
    defaultScope: {attributes: ['id','userId','spotId','review','stars','createdAt','updatedAt']},

  });
  return Review;
};
// attributes: ['id','userId','spotId','review','stars','createdAt','updatedAt'],
