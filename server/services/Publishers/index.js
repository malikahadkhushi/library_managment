const { Publishers } = require('../../models'); // Import your Sequelize model
const Sequelize = require('sequelize');

exports.findPublisher = (obj)=>{
   return Publishers.findAndCountAll({
        where: {
          name: { [Sequelize.Op.iLike]: `%${obj.searchText}%` }, // Case-insensitive search
        },
        limit:obj.limit,
        offset:obj.offset,
        order: [['name', 'ASC']], // Replace with your desired sorting column
      });
}

exports.createpublisher = (obj)=>{

  return Publishers.create(obj);

}

exports.checkPublisher = (id)=>{

  return Publishers.findOne({where:{id:id}});

}

exports.updatepublisher = (obj)=>{
  return  Publishers.update(
    obj.Publisher,
    {
      where: { id: obj.publisherId },
    }
  );
}


exports.deletePublisher = (id)=>{

  return Publishers.destroy({where:{id:id}})

}


exports.allPublishers = (obj)=>{

  return Publishers.findAll({
    limit:obj.limit,
    offset:obj.offset
  })
}

exports.getpublisher = (id)=>{

  return Publishers.findOne({where:{id:id}});

}