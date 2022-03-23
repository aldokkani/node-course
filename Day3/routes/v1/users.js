const express = require('express');

const USERS = require('../../dev-data/data/users.json');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  res.json(USERS);
});

usersRouter.post('/', (req, res) => {
  console.log(req.body);
  USERS.push(req.body);
  res.json(req.body);
});

usersRouter.patch('/:id', (req, res) => {
  res.send('user updated');
});

usersRouter.delete('/:id', (req, res) => {
  res.send('user deleted');
});

module.exports = usersRouter;
