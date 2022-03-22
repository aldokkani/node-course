const express = require('express');

const TOURS = require('../dev-data/data/tours-simple.json');

const toursRouter = express.Router();

toursRouter.get('/', (req, res) => {
  res.json(TOURS);
});

toursRouter.post('/', (req, res) => {
  console.log(req.body);
  TOURS.push(req.body);
  res.json(req.body);
});

toursRouter.patch('/:id', (req, res) => {
  res.send('user updated');
});

toursRouter.delete('/:id', (req, res) => {
  res.send('user deleted');
});

toursRouter.get('/:id', (req, res) => {
  const tourId = req.params.id;
  if (tourId >= TOURS.length) {
    res.status(404).send('Tour not found');
  }
  res.json(TOURS[tourId]);
});

module.exports = toursRouter;
