const express = require('express');
const mongoose = require('mongoose');
const JobListing = require('./models/JobListing'); // Assuming you have a JobListing model

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});