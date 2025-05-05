const archiveRoutes = require('./routes/archiveRoutes');
const connectDB = require('./config/db');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());

app.use(cors())
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/archive', archiveRoutes);

connectDB();

module.exports = app;