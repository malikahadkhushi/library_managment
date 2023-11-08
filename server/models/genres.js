'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genres.hasMany(models.Publishers, { foreignKey: 'genre_speciality',onDelete:"CASCADE" });
      Genres.hasMany(models.Books, { foreignKey: 'genre',onDelete:"CASCADE" });
    }
  }
  Genres.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genres',
  });
  return Genres;
};