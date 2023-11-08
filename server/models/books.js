'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // A Book belongs to an Author
       Books.belongsTo(models.Authors, {
        foreignKey: 'author',
        onDeleted:'CASCADE' // Name of the foreign key in the "Books" table
       // You can specify an alias for the association
      });

      // A Book belongs to a Publisher
      Books.belongsTo(models.Publishers, {
        foreignKey: 'publisher',
        onDelete:'CASCADE' // Name of the foreign key in the "Books" table
         // You can specify an alias for the association
      });

      // A Book belongs to a Genre
      Books.belongsTo(models.Genres, {
        foreignKey: 'genre',
        onDelete:'CASCADE' // Name of the foreign key in the "Books" table
        // You can specify an alias for the association
      });
    }
  }
  Books.init({
    // id: DataTypes.UUID,
    title: DataTypes.STRING,
    author: DataTypes.UUID,
    publisher: DataTypes.UUID,
    genre: DataTypes.UUID,
    publication_year: DataTypes.INTEGER,
    ISBN: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
    timestamps:false
  });
  return Books;
};