const {
        createpublisher,
        updatepublisher,
        checkPublisher,
        deletePublisher,
        allPublishers,
        getpublisher

 } = require('../../services/Publishers');

exports.createPublisher = async (req, res) => {

    try {
        const { name, genre_speciality, founded_date, city, country } = req.body;

        // Validate the fields
        if (!name || !genre_speciality || !founded_date || !city || !country) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        // Create the book
        const publisher = await createpublisher(req.body);

        res.status(200).json({ message: 'Publisher inserted Successfully', publisher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }

}

exports.updatePublisher = async (req, res) => {

    const publisherId = req.params.id;
    console.log(publisherId)
    const Publisher = req.body;
    const { name, genre_speciality, founded_date, city, country} = req.body;

    try {
        // Check if the book exists
        const existingPublisher = await checkPublisher(publisherId);
        if (!existingPublisher) {
            return res.status(404).json({ error: 'Publisher not found' });
        }

        // Validate the fields (you can reuse the validation logic from the create route)

        if (!name || !genre_speciality || !founded_date || !city || !country ) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        // Update the book
        const [updatedCount] = await updatepublisher({ Publisher, publisherId })

        if (updatedCount > 0) {
        
            return res.status(200).json({ message: 'Publisher updated successfully' });
        }
        else
        {
            return res.status(500).json({ error: 'Book was not updated' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

exports.deletePublisher = async (req, res) => {
    try {
        const publisherId = req.params.id; // Assuming the book ID is passed as a route parameter
        console.log(publisherId)
        // Check if the book exists
        const book = await checkPublisher(publisherId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Delete the book
        let ack = await deletePublisher(publisherId);

        if (ack) {

            res.status(200).json({ message: 'Publihser deleted successfully' });
        }
        else {
            res.status(400).json({ message: 'publisher is not deleted' });

        }
    } catch (error) {
        console.error('Error deleting Publisher:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllPublishers = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = 50;
        const offset = (page - 1) * limit;
        const para = {
            limit,
            offset,
        };

        const publisher = await allPublishers(para);

        if (publisher.length === 0) {
            return res.status(404).json({ error: "No more records to retrieve" });
        }

        return res.status(200).json({ publisher });
    } catch (error) {
        console.error("Controller Get Publishers", error);
        res.status(500).json({ error: "Internal server error Check Page Number" });
    }

}


exports.getSinglePublisher = async (req, res) => {

    let publisherId = req.params.id;

    try {

        let publisher = await getpublisher(publisherId);
        if (!publisher) {
            res.status(401).send("Book Not Found By this id");
        }
        else {
            res.status(200).send(publisher);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");

    }
}

