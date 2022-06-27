
exports.getAccounts = (req, res) => {
    console.log("**** GET /getAccounts ****");
    console.log(req.body);
    utility.initContracts(function (answer) {
      //res.send(answer);
      res.render('accounts', {
        title: 'get account',
        account: answer
      })
      console.log(answer)
    })
}