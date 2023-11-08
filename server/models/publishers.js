'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publishers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publishers.hasMany(models.Books, { foreignKey: 'publisher',onDelete:'CASCADE' });
      Publishers.hasOne(models.Genres,{ foreignKey: 'publisher',onDelete:'CASCADE' })


    }
  }
  Publishers.init({
    name: DataTypes.STRING,
    genre_speciality: DataTypes.UUID,
    founded_date: DataTypes.DATE,
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publishers',
  });
  return Publishers;
};