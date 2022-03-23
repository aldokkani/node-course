const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');

const { HOST, DB_URL } = process.env;
const PORT = process.env.abas;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('connection failed =>', err);
  });

app.listen(PORT, HOST, () => {
  console.log('server is running');
});
