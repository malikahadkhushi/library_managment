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