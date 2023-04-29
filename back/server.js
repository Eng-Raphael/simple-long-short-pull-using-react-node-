const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// get routes 
const longPollingRoute = require('./routes/longPolling');
const shortPollingRoute = require('./routes/shortPolling');

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// use routes
app.use('/long', longPollingRoute);
app.use('/short', shortPollingRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
