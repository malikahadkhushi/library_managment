const express = require('express');
const router = express.Router();

const { Publishers, Books } = require('../models');

const deletePublisher = async (req, res) => {
  try {
    const publisherId = req.params.id;

    // Find the publisher
    const publisher = await Publishers.findOne({where: {id:publisherId}});

    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found' });
    }

    // Find and delete all books associated with the publisher
    await Books.destroy({
      where: { publisher:publisherId },
    });

    // Now, delete the publisher
    await publisher.destroy();

    return res.status(200).json({ message: 'Publisher and associated books deleted successfully' });
  } catch (error) {
    console.error('Error deleting publisher:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = deletePublisher;
