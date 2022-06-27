
exports.sendToken = (req, res) => {
    console.log("****** Send Token ******");
    utility.sendToken(req.body.address, req.body.amount, function(answer){
      res.send(answer);
    })
} 

exports.getBalance = (req, res) => {
    console.log("******* get Balance *******");
    utility.getBalance(req.body.address, function(answer){
      res.send(answer);
    })
}

exports.recoverToken = (req, res) => {
    console.log("**** Recover Token ****");
    utility.recoverToken(req.body.address, req.body.amount, function(answer){
      res.send(answer);
    })
}