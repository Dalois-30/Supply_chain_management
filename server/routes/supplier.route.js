const express = require('express');
const route = express.Router();

const supplier = require('../controller/supplier.controller');

//API
route.post('/add', supplier.add);
route.get('/', supplier.getAll);
route.get('/:id', supplier.getOne);
route.delete('/:id', supplier.delete);
route.put('/', supplier.updateAll);
route.get('/checkReputation', supplier.checkReputation);
route.get('/filterByReputation', supplier.filterByReputation);
route.get('/filterByGoodsType', supplier.filterByGoodType);

module.exports = route;