
const utility = require('./utilities.js'); 
const express = require('express');
const Web3 = require('web3');
const morgan = require('morgan')
//const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const path = require('path');
const { ppid } = require('process');
const PORT = process.env.PORT || 8080

const app = express();

const producer = require('./server/routes/producer.route');
const product = require('./server/routes/product.route');
const account = require('./server/routes/account.route');
const token = require('./server/routes/token.route');
const supplier = require('./server/routes/supplier.route');
const shipment = require('./server/routes/shipment.route');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public_static')));
//app.use('/', express.static('public_static'));

app.use('/producer', producer);
app.use('/product', product);
app.use('/', account);
app.use('/token', token);
app.use('/supplier', supplier);
app.use('/shipment', shipment);

app.listen(PORT, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  utility.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  utility.initContracts(function (answer) {
    console.log(answer);
  })
 
 console.log(`Srever is running on http://localhost:${PORT}`);

});

