const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const server = app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is running on http://localhost:${server.address().port}`);
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected");
    }
    catch (err) {
        console.log(err);
    }
})