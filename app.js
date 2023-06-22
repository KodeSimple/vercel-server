const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(bodyParser.json());


app.use(cors({
  origin: 'kodesimple-client-ksco8yxq0-kodesimple.vercel.app'
}));

// Middleware logger
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use('/users', require('./routes/users.router')); // http://localhost:8080/users

module.exports = app;

