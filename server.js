
const utility = require('./utilities.js'); 
const express = require('express');
const Web3 = require('web3');
//const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const path = require('path');
const { ppid } = require('process');
const PORT = process.env.PORT || 8080

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('/', express.static('public_static'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  console.log(req.body);
  utility.initContracts(function (answer) {
    res.send(answer);
  })
});

app.post('/producers/add', (req, res) => {
  console.log("**** post /addProducer ****");
  // name, phoneNo, cityState, country
  console.log(req.body);
  
  utility.addProducer(req.body.name, req.body.phoneNo, req.body.cityState, req.body.country, function(answer){
    res.send(answer);
    
  })
  
});

app.get('/producers', (req, res) => {
  console.log("**** get /Producer ****");
  utility.allProducers(function(answer){
    res.send(answer);
  })
    
})

app.get('/producers/:id', (req, res) => {
  console.log("**** get /Producer ****");
  utility.findProducer(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.delete('/producers/:id', (req, res) => {
  console.log("**** delete /Producer ****");
  utility.removeProducer(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.put('/producers/:id', (req, res) => {
  console.log("**** put /Producer ****");
  utility.certifyProducer(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.post('/products/add', (req, res) => {
  console.log("**** post /addProduct ****");
  // name, phoneNo, cityState, country
  var location = [];
  location[0] = req.body.longitude;
  location[1] = req.body.latitude;
  console.log(req.body);
  
  utility.addProduct(req.body.serialNo, location, function(answer){
    res.send(answer);
    
  })
  
});

app.get('/products', (req, res) => {
  console.log("**** get /Products ****");
  utility.allProducts(function(answer){
    res.send(answer);
  })
    
})

app.get('/products/:id', (req, res) => {
  console.log("**** get /Producer ****");
  utility.findProduct(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.delete('/products/:id', (req, res) => {
  console.log("**** delete /Producer ****");
  utility.removeProduct(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.post("/sendToken", (req, res) => {
  console.log("****** Send Token ******");
  utility.sendToken(req.body.address, req.body.amount, function(answer){
    res.send(answer);
  })
})

app.get("/getBalance", (req, res) => {
  console.log("******* get Balance *******");
  utility.getBalance(req.body.address, function(answer){
    res.send(answer);
  })
})

app.post("/recoverToken", (req, res) => {
  console.log("**** Recover Token ****");
  utility.recoverToken(req.body.address, req.body.amount, function(answer){
    res.send(answer);
  })
})

app.post("/shipments/setParameter", (req, res) => {
  console.log("****** configuration of contract ******");
  utility.setContractParameters(req.body.location1, req.body.location2, req.body.leadTime, req.body.payment, function(answer){
    res.send(answer);
  })
})

app.post("/shipments/send", (req, res) => {
  console.log("***** Send shipment ******");
  utility.sendShipment(req.body.trackingNo, req.body.item, req.body.quantity, req.body.location1, req.body.location2, function(answer){
    res.send(answer);
  })
})

app.post("/shipments/recieve", (req, res) => {
  console.log("***** recieve shipment ******");
  utility.sendShipment(req.body.trackingNo, req.body.item, req.body.quantity, req.body.location1, req.body.location2, function(answer){
    res.send(answer);
  })
})

app.delete('/shipments/:id', (req, res) => {
  console.log("**** delete /shipment ****");
  utility.deleteShipment(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.get('/shipments/:id', (req, res) => {
  console.log("**** get /shipment ****");
  utility.checkShipment(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.get('/shipments/checkSuccess', (req, res) => {
  console.log("**** get /shipment ****");
  utility.checkSuccess(req.body.address, function(answer){
    res.send(answer);
  })
    
})

app.get('/shipments', (req, res) => {
  console.log("**** get all /shipment ****");
  utility.allShipment(function(answer){
    res.send(answer);
  })
    
})

app.post('/supplier/add', (req, res) => {
  console.log("**** post /add supplier ****");
  // name, phoneNo, cityState, country
  console.log(req.body);
  
  utility.addSupplier(req.body.name, req.body.phoneNo, req.body.cityState, req.body.country, req.body.goodsType, function(answer){
    res.send(answer);
    
  })
  
});

app.get('/supplier', (req, res) => {
  console.log("**** get /suppliers ****");
  utility.allSuppliers(function(answer){
    res.send(answer);
  })
    
})

app.get('/supplier/:id', (req, res) => {
  console.log("**** get /supplier ****");
  utility.findSupplier(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.delete('/supplier/:id', (req, res) => {
  console.log("**** delete /supplier ****");
  utility.removeSupplier(req.params.id, function(answer){
    res.send(answer);
  })
    
})

app.put('/suppplier', (req, res) => {
  console.log("**** put /Producer ****");
  utility.updateReputation(function(answer){
    res.send(answer);
  })
    
})

app.get('/supplier/checkReputation', (req, res) => {
  console.log("**** get /supplier ****");
  utility.checkReputation(req.body.address, function(answer){
    res.send(answer);
  })
    
})

app.get('/supplier/filterByReputation', (req, res) => {
  console.log("**** get /supplier ****");
  utility.filterByReputation(req.body.reputation, function(answer){
    res.send(answer);
  })
    
})

app.get('/supplier/filterByGoodsType', (req, res) => {
  console.log("**** get /supplier ****");
  utility.filterByGoodsType(req.body.goodsType, function(answer){
    res.send(answer);
  })
    
})


app.listen(PORT, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  utility.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  utility.initContracts(function (answer) {
    console.log(answer);
  })
 
 console.log(`Srever is running on http://localhost:${PORT}`);

});

