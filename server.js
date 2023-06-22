const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 8000;

dotenv.config(); // Load environment variables from .env file

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    server.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

startServer();


// const http = require('http');
// const app = require('./app');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const PORT = process.env.PORT || 8000;

// // const MONGO_URL = 'mongodb+srv://jsiroy:zRY1e6nXvffKn9AW@cluster0.ptiwiey.mongodb.net/pos?retryWrites=true&w=majority';

// const server = http.createServer(app);

// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected');
// });

// async function startServer() {
//   await.mongoose.connect(process.env.MONGO_URL);

//   async function startServer() {
//     await.mongoose.connect(process.env.MONGO_URL);

//      app.listen(PORT, () => {
//     console.log(`Server is listening to http://localhost:${PORT}`)
// })
// }

// }

// startServer();