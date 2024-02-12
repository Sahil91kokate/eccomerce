const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const connectToMongo = async () => require('./db');

// Enable CORS with specific options
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// MongoDB
connectToMongo();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use(express.json());

app.use('/api', require('./Routes/Razor'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
