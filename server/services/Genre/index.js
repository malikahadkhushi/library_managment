const { Genres } = require('../../models'); // Import your Sequelize model
const Sequelize = require('sequelize');



exports.insertgenre = (obj)=>{
    return Genres.create({
        name:obj
    }, {
        returning: ['id', 'name', 'createdAt', 'updatedAt'], // Specify the columns you want to return
      });
}

exports.checkGenre = (id)=>{

    return Genres.findOne({where:{id:id}});
  
  }
  
  exports.updategenre = (obj)=>{
    return  Genres.update(
      obj.Genre, // Updated values for the "name" column
  {
    where: { id: obj.genreId }, // Condition to find the specific record to update
    individualHooks: true,
    exclude: ['publisher'], // Specify the columns to exclude
  }
    );
  }
  
  
  exports.deletegenre = (id)=>{
  
    return Genres.destroy(
      {where:{id:id},
      attributes:['id','name'] }
      )
  
  }
  
  
  exports.allGenres = (obj)=>{
  
    return Genres.findAll({
      limit:obj.limit,
      offset:obj.offset,
      attributes:['id','name']
    })
  }
  
  exports.getGenre = (id)=>{
  
    return Genres.findOne({where:{id:id},attributes:['id','name']});
  
  }