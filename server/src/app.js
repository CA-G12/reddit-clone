const { join } = require('path');

require('dotenv').config();

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const router = require('./routes');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(helmet.contentSecurityPolicy({ useDefaults: true, directives: { 'img-src': ["'self'", 'https: data:'] } }));
app.use(express.static(join(__dirname, '..', '..', 'private')));
app.use(express.static(join(__dirname, '..', '..', 'public')));
app.use('/api/v1/', router);

module.exports = app;
