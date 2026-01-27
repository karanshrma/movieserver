const express = require('express');
const cors = require('cors');

const movieRouter = require('./routes/movie');

const app = express();

app.use(cors());
app.use(movieRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});