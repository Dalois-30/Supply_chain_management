
exports.send = (req, res) => {
    console.log("***** Send shipment ******");
    utility.sendShipment(req.body.trackingNo, req.body.item, req.body.quantity, req.body.location1, req.body.location2, function(answer){
      res.send(answer);
    })
}

exports.recieve = (req, res) => {
    console.log("***** recieve shipment ******");
    utility.sendShipment(req.body.trackingNo, req.body.item, req.body.quantity, req.body.location1, req.body.location2, function(answer){
      res.send(answer);
    })
}

exports.delete = (req, res) => {
    console.log("**** delete /shipment ****");
    utility.deleteShipment(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.getAll = (req, res) => {
    console.log("**** get all /shipment ****");
    utility.allShipment(function(answer){
      res.send(answer);
    })
      
}

exports.getOne = (req, res) => {
    console.log("**** get /shipment ****");
    utility.checkShipment(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.checkSuccess = (req, res) => {
    console.log("**** get /shipment ****");
    utility.checkSuccess(req.body.address, function(answer){
      res.send(answer);
    })
      
}

exports.setParameter = (req, res) => {
    console.log("****** configuration of contract ******");
    utility.setContractParameters(req.body.location1, req.body.location2, req.body.leadTime, req.body.payment, function(answer){
      res.send(answer);
    })
}
