const express = require('express');
const route = express.Router();

const product = require('../controller/product.controller');

//API
route.post('/add', product.add);
route.get('/', product.getAll);
route.get('/:id', product.getOne);
route.delete('/:id', product.delete);


module.exports = route;
