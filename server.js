const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://jsiroy:zRY1e6nXvffKn9AW@cluster0.ptiwiey.mongodb.net/pos?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    
    server.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();