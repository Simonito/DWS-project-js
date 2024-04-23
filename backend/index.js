const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { frontendOrigin } = require('./common/constants');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: frontendOrigin,
    credentials: true,
}));


const routes = require('./routes');
app.use('/v1', routes);

const port = process.env.APP_PORT || 37_000;

console.log('listening on port ' + port);
app.listen(port);
