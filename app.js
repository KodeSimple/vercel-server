const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(bodyParser.json()); 
   ///////////api origin//////////////////
app.use(
  cors({
    origin: 'https://kodesimple.vercel.app/'
  })
);


app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use('/users', require('./routes/users.router')); // Mounting the users router

module.exports = app;


