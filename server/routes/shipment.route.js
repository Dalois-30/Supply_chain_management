const express = require('express');
const route = express.Router();

const shipment = require('../controller/shipment.controller');

//API
route.post("/setParameter", shipment.setParameter);
route.post("/send", shipment.send);
route.post("/recieve", shipment.recieve);
route.delete('/:id', shipment.delete);
route.get('/:id', shipment.getOne);
route.get('/checkSuccess', shipment.checkSuccess);
route.get('/', shipment.getAll);

module.exports = route;