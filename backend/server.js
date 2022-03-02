const express = require('express');
const dotenv = require('dotenv').config();
const port = 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/testroutes'));

app.use('/login', (req, res) => {
    res.status(200).json({message: 'You have reached the login page'})
})

app.listen(port, () => console.log("hello"));