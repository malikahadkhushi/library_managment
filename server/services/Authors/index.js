const { Authors } = require('../../models'); // Import your Sequelize model
const Sequelize = require('sequelize');

exports.findAuthor = (obj) => {
    return Authors.findAndCountAll({
        where: {
            name: { [Sequelize.Op.iLike]: `%${obj.searchText}%` }, // Case-insensitive search
        },
        limit: obj.limit,
        offset: obj.offset,
        order: [['name', 'ASC']], // Replace with your desired sorting column
    });
}

exports.insertauthor = (obj)=>{
    return Authors.create(obj);
}

exports.checkAuthor = (id)=>{

    return Authors.findOne({where:{id:id}});
  
  }
  
  exports.updateauthor = (obj)=>{
    return  Authors.update(
      obj.Author,
      {
        where: { id: obj.authorId },
      }
    );
  }
  
  
  exports.deleteAuthor = (id)=>{
  
    return Authors.destroy({where:{id:id}})
  
  }
  
  
  exports.allAuthors = (obj)=>{
  
    return Authors.findAll({
      limit:obj.limit,
      offset:obj.offset
    })
  }
  
  exports.getauthor = (id)=>{
  
    return Authors.findOne({where:{id:id}});
  
  }