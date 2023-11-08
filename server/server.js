const express = require('express');
const db = require('./models');
require('../server/models/index.js');
const authRouter = require('./routes/authRoutes/index.js');
const booksRouter = require('./routes/booksRouter/index.js');
const publisherRoute = require('./routes/publisherRoutes/index.js');
const authorRouter = require('./routes/authorRoutes/index.js');
const genreRouter = require('./routes/genreRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', authRouter);
app.use('/', booksRouter);
app.use('/', publisherRoute);
app.use('/', authorRouter);
app.use('/',genreRouter);


app.listen(port, function () {
  console.log(`server is successfully running on port ${port}......`);

});