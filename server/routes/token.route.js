const express = require('express');
const route = express.Router();

const token = require('../controller/token.controller');

//API
route.post("/sendToken", token.sendToken);
route.get("/getBalance", token.getBalance);
route.post("/recoverToken", token.recoverToken);

module.exports = route;