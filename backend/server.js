const express = require('express');
const dotenv = require('dotenv').config();
const port = 5000;
const colors = require('colors')
const connectMongo = require('./config/db');
const { connect } = require('./routes/testroutes');


connectMongo()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/testroutes'));
app.use('/', require('./routes/userRoutes'));

app.listen(port, () => console.log("hello"));