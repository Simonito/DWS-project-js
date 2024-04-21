const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());

const routes = require('./routes');
app.use('/v1', routes);

const port = process.env.APP_PORT | 37_000;

app.listen(port);