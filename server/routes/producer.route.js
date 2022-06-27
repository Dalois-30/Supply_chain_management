const express = require('express');
const route = express.Router();

const producer = require('../controller/producers.controller');

//API
route.post('/producers/add', producer.add);
route.get('/producers', producer.getAll);
route.get('/producers/:id', producer.getOne);
route.delete('/producers/:id', producer.delete);
route.put('/producers/:id', producer.update);

module.exports = route;