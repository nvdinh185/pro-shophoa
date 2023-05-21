const express = require('express');
const path = require('path');
const app = express();
const errorHandler = require('./_helpers/error-handler');

app.use(express.json());

const publicPath = path.join(__dirname, "client");
app.use(express.static(publicPath));

// api routes
app.use('/hoa', require('./hoa/hoa.controller'));

// global error handler
app.use(errorHandler);

app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'PageNotFound.html'));
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));