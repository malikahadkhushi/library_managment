const { findPublisher } = require("../../services/Publishers");

const getPublsiherByText = async (req, res) => {
  const searchText = req.body.name; // Text to search

  const page = parseInt(req.params.page, 10) || 1; // Page number
  const limit = 50; // Number of records per page

  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await findPublisher({ searchText, limit, offset });

    let remainingRecords = count - page * limit;

    if (remainingRecords < 0) {
      remainingRecords = 0;
    }

    let result = {
      totalRecords: count,
      remainingRecords: remainingRecords,
      records: rows,
    };

    if (!rows.length) {
      res.status(401).send("Publishers  not Found");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve records." });
  }
};

module.exports = getPublsiherByText;
