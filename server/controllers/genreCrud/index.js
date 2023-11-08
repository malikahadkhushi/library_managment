const {
   insertgenre,
   checkGenre,
   updategenre,
   deletegenre,
   allGenres,
   getGenre
} = require('../../services/Genre');

exports.createGenre = async (req, res) => {

try {
    const { name } = req.body;
    console.log(name)
    // Validate the fields
    if (!name) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    // Create the book
    const genre = await insertgenre(name);

    res.status(200).json({ message: 'Genre inserted Successfully', genre });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
}

}

exports.updateGenre = async (req, res) => {

const gerneId = req.params.id;

if(gerneId.length != 36 ){
    return res.status(400).json({ error: 'Invalid uuid format' });

}
console.log(gerneId)
const Genre = req.body;
const { name } = req.body;

try {
    // Check if the book exists
    const existingGenre = await checkGenre(gerneId);
    if (!existingGenre) {
        return res.status(404).json({ error: 'Genre not found' });
    }

    // Validate the fields (you can reuse the validation logic from the create route)

    if (!name ) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    // Update the book
    const [updatedCount] = await updategenre({ Genre, gerneId })

    console.log("Update Count" , updatedCount)

    if (updatedCount > 0) {
    
        return res.status(200).json({ message: 'Genre updated successfully' });
    }
    else
    {
        return res.status(500).json({ error: 'Genre was not updated' });
    }

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
}
}

exports.deleteGenre = async (req, res) => {
try {
    const genreId = req.params.id; // Assuming the book ID is passed as a route parameter
    console.log(genreId);

    
if(genreId.length != 36 ){
    return res.status(400).json({ error: 'Invalid uuid format' });

}

    // Check if the book exists
    const  genre = await checkGenre(genreId);

    if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
    }

    // Delete the book
    let ack = await deletegenre(genreId);

    if (ack) {

        res.status(200).json({ message: 'Genre deleted successfully' });
    }
    else {
        res.status(400).json({ message: 'Genre is not deleted' });

    }
} catch (error) {
    console.error('Error deleting Genre:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
}

exports.getAllGenres = async (req, res) => {
try {
    const page = parseInt(req.params.page) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;
    const para = {
        limit,
        offset,
    };

    const genres = await allGenres(para);

    if (genres.length === 0) {
        return res.status(404).json({ error: "No more records to retrieve" });
    }

    return res.status(200).json({ genres });
} catch (error) {
    console.error("Controller Get Genre", error);
    res.status(500).json({ error: "Internal server error Check Page Number" });
}

}


exports.getSingleGenre = async (req, res) => {

let genreId = req.params.id;

try {

    if(genreId.length != 36 ){
        return res.status(400).json({ error: 'Invalid uuid format' });
    
    }

    let genre = await getGenre(genreId);
    if (!genre) {
        res.status(401).send("Author Not Found By this id");
    }
    else {
        res.status(200).send(genre);
    }

} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");

}
}

