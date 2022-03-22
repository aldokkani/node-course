const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/tours', toursRouter);
app.use('/users', usersRouter);

app.listen(8000, () => {
  console.log('server is running');
});

// https://github.com/aldokkani/node-course
