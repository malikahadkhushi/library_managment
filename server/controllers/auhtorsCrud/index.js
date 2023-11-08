const {
    insertauthor,
    checkAuthor,
    updateauthor,
    deleteAuthor,
    allAuthors,
    getauthor
} = require('../../services/Authors');

exports.createAuthor = async (req, res) => {

try {
    const { name,birth_date, country,biography } = req.body;

    // Validate the fields
    if (!name || !birth_date || !biography || !country) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    // Create the book
    const author = await insertauthor(req.body);

    res.status(200).json({ message: 'Author inserted Successfully', author });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
}

}

exports.updateAuthor = async (req, res) => {

const authorId = req.params.id;

if(authorId.length != 36 ){
    return res.status(400).json({ error: 'Invalid uuid format' });

}
console.log(authorId)
const Author = req.body;
const { name, birth_date,country,biography} = req.body;

try {
    // Check if the book exists
    const existingAuthor = await checkAuthor(authorId);
    if (!existingAuthor) {
        return res.status(404).json({ error: 'Author not found' });
    }

    // Validate the fields (you can reuse the validation logic from the create route)

    if (!name || !birth_date || !biography || !country ) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    // Update the book
    const [updatedCount] = await updateauthor({ Author, authorId })

    if (updatedCount > 0) {
    
        return res.status(200).json({ message: 'Author updated successfully' });
    }
    else
    {
        return res.status(500).json({ error: 'Author was not updated' });
    }

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
}
}

exports.deleteAuthor = async (req, res) => {
try {
    const authorId = req.params.id; // Assuming the book ID is passed as a route parameter
    console.log(authorId);

    
if(authorId.length != 36 ){
    return res.status(400).json({ error: 'Invalid uuid format' });

}

    // Check if the book exists
    const  author = await checkAuthor(authorId);

    if (!author) {
        return res.status(404).json({ message: 'Author not found' });
    }

    // Delete the book
    let ack = await deleteAuthor(authorId);

    if (ack) {

        res.status(200).json({ message: 'Author deleted successfully' });
    }
    else {
        res.status(400).json({ message: 'Author is not deleted' });

    }
} catch (error) {
    console.error('Error deleting Author:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
}

exports.getAllAuthors = async (req, res) => {
try {
    const page = parseInt(req.params.page) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;
    const para = {
        limit,
        offset,
    };

    const authors = await allAuthors(para);

    if (authors.length === 0) {
        return res.status(404).json({ error: "No more records to retrieve" });
    }

    return res.status(200).json({ authors });
} catch (error) {
    console.error("Controller Get Authors", error);
    res.status(500).json({ error: "Internal server error Check Page Number" });
}

}


exports.getSingleAutor = async (req, res) => {

let authorId = req.params.id;

try {

    if(authorId.length != 36 ){
        return res.status(400).json({ error: 'Invalid uuid format' });
    
    }

    let author = await getauthor(authorId);
    if (!author) {
        res.status(401).send("Author Not Found By this id");
    }
    else {
        res.status(200).send(author);
    }

} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");

}
}

