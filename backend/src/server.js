const archiveRoutes = require('./routes/archiveRoutes');
const connectDB = require('./config/db');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/archive', archiveRoutes);

connectDB();

module.exports = app;