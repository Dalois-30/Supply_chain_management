const express = require('express');
const route = express.Router();

const account = require('../controller/account.controller');

//API
route.get('/', account.getAccounts);

module.exports = route;