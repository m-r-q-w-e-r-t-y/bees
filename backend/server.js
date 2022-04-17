const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config();
const colors = require('colors')
const connectMongo = require('./config/db');
const { connect } = require('./routes/testroutes');


connectMongo()

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/testroutes'));
app.use('/', require('./routes/userRoutes'));

app.listen(process.env.PORT, () => console.log("hello"));