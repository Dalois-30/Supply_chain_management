
exports.add = (req, res) => {
    console.log("**** post /add supplier ****");
    // name, phoneNo, cityState, country
    console.log(req.body);
    
    utility.addSupplier(req.body.name, req.body.phoneNo, req.body.cityState, req.body.country, req.body.goodsType, function(answer){
      res.send(answer);
      
    })
    
}

exports.getAll = (req, res) => {
    console.log("**** get /suppliers ****");
    utility.allSuppliers(function(answer){
      res.send(answer);
    })
      
}

exports.getOne = (req, res) => {
    console.log("**** get /supplier ****");
    utility.findSupplier(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.delete = (req, res) => {
    console.log("**** delete /supplier ****");
    utility.removeSupplier(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.updateAll = (req, res) => {
    console.log("**** put /Producer ****");
    utility.updateReputation(function(answer){
      res.send(answer);
    })
      
}

exports.checkReputation = (req, res) => {
    console.log("**** get /supplier ****");
    utility.checkReputation(req.body.address, function(answer){
      res.send(answer);
    })
      
}

exports.filterByReputation = (req, res) => {
    console.log("**** get /supplier ****");
    utility.filterByReputation(req.body.reputation, function(answer){
      res.send(answer);
    })
      
}

exports.filterByGoodType = (req, res) => {
    console.log("**** get /supplier ****");
    utility.filterByGoodsType(req.body.goodsType, function(answer){
      res.send(answer);
    })
      
}

