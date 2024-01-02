const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const { readdirSync } = require('fs');

// display sample Hello World page under '/'

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require(`./routes/${route}`))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

server();
