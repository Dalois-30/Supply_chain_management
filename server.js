
const utility = require('./utilities.js'); 
const express = require('express');
const Web3 = require('web3');
//const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/', express.static('public_static'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

 app.get('/getAccounts', (req, res) => {
   console.log("**** GET /getAccounts ****");
   utility.initContracts(function (answer) {
     res.send(answer);
   })
 });
 
// app.post('/getBalance', (req, res) => {
//   console.log("**** GET /getBalance ****");
//   console.log(req.body);
//   let currentAcount = req.body.account;
// 
//   utility.refreshBalance(currentAcount, (answer) => {
//     let account_balance = answer;
//     utility.start(function(answer){
//       // get list of all accounts and send it along with the response
//       let all_accounts = answer;
//       response = [account_balance, all_accounts]
//       res.send(response);
//     });
//   });
// });

// app.post('/sendCoin', (req, res) => {
//   console.log("**** GET /sendCoin ****");
//   console.log(req.body);
// 
//   let amount = req.body.amount;
//   let sender = req.body.sender;
//   let receiver = req.body.receiver;
// 
//   utility.sendCoin(amount, sender, receiver, (balance) => {
//     res.send(balance);
//   });
// });

app.listen(PORT, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  utility.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  
  console.log(utility.web3.eth.getAccounts(function(error, accounts){
    if (error) {
      console.log(error);
    }

    var account = accounts[0];
    console.log(accounts);
  }));
 
 console.log(`Srever is running on http://localhost:${PORT}`);

});

