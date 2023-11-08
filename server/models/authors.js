'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Authors.hasMany(models.Books, {
        foreignKey: 'author',
        onDelete:'CASCADE' // Name of the foreign key in the "Books" table
      });
    }
  }
  Authors.init({
    name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    country: DataTypes.STRING,
    biography: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Authors',
  });
  return Authors;
};