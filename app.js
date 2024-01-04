const express = require("express");

require('dotenv').config
const db=require('./config/db')
const config=require('./config/index')

const app = express();

const PORT=config.PORT;
const path = require('path');

const routes=require('./routes/indexRoute')
const cors = require('cors');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connection successful');
});

app.use(cors());
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/',routes)

app.listen(PORT, () => {
  console.log("its listening on port "+ PORT);
});
