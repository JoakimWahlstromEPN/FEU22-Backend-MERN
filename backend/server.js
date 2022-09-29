const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 9999;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => console.log('Server running on port: ' + PORT));
mongoose.connect(MONGO_URI, () => console.log('connected to db'))