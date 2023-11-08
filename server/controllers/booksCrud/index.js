const { insertBook, deletebook, checkBook, updatebook } = require('../../services/Books');

// Creating Book
exports.createBook = async (req, res) => {

    let book = req.body;
    console.log(book)
    try {
        const { title, author, publisher, genre, publication_year, ISBN } = req.body;

        // Validate the fields
        if (!title || !author || !publisher || !genre || !publication_year || !ISBN) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        // Validate the publication year
        if (publication_year < 1000 || publication_year > 9999) {
            return res.status(400).json({ error: 'Publication year must be a valid 4-digit year' });
        }

        // Create the book
        const book = await insertBook(req.body);

        res.status(200).json({ message: 'Book inserted Successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }

}

// Delete Book

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id; // Assuming the book ID is passed as a route parameter
        console.log(bookId)
        // Check if the book exists
        const book = await checkBook(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Delete the book
        let ack = await deletebook(bookId);

        if (ack) {

            res.status(200).json({ message: 'Book deleted successfully' });
        }
        else {
            res.status(400).json({ message: 'Book is not deleted' });

        }
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Update Book
exports.updateBook = async (req, res) => {

    const bookId = req.params.id;
    const book = req.body;
    const { title, author, publisher, genre, publication_year, ISBN } = req.body;

    try {
        // Check if the book exists
        const existingBook = await checkBook(bookId);
        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Validate the fields (you can reuse the validation logic from the create route)

        if (!title || !author || !publisher || !genre || !publication_year || !ISBN) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        if (publication_year < 1000 || publication_year > 9999) {
            return res.status(400).json({ error: 'Publication year must be a valid 4-digit year' });
        }
        // Update the book
        const [updatedCount] = await updatebook({ book, bookId })

        if (updatedCount > 0) {
            const updatedBook = await checkBook(bookId);
            return res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
        }

        return res.status(500).json({ error: 'Book was not updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

// getBooks
exports.getBooks = async (res, res) => {
    try {
        const page = parseInt(req.params.ID) || 1;
        const limit = 50;
        const offset = (page - 1) * limit;
        const para = {
            limit,
            offset,
        };

        const books = await allBooks(para);

        if (books.length === 0) {
            return res.status(404).json({ error: "No more records to retrieve" });
        }

        return res.status(200).json({ books });
    } catch (error) {
        console.error("Controller Get Books", error);
        res.status(500).json({ error: "Internal server error Check Page Number" });
    }

}