const archiveRoutes = require('./routes/archiveRoutes');
const connectDB = require('./config/db');
const express = require('express');

const app = express();
const port = 5000

app.use(express.json());

app.use('/archive', archiveRoutes);

connectDB();

module.exports = app;