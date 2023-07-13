'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, { foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true });
      User.hasMany(models.Review, { foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true });
      User.hasMany(models.Spot, { foreignKey: 'ownerId',
      onDelete: 'CASCADE',
      hooks: true });
      const columnMapping = {
        through: 'Booking',
        otherKey: 'spotId',
        foreignKey: 'userId'
       }
       User.belongsToMany(models.Spot, columnMapping);

       const columnMapping2 = {
        through: 'Review',
        otherKey: 'spotId',
        foreignKey: 'userId'
       }
       User.belongsToMany(models.Spot, columnMapping2);
    }
    }




  User.init(
    {

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["firstName","lastName","hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        returnAll: {
          
        }
      }
    }
  );
  return User;
};
