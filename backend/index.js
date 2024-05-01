const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors'); 

require('dotenv').config({ path: '../.env' });


app.use(express.json());
app.use(cors({credentials: true, origin: true}));

// Connecting to MongoDB

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/api', routes);
