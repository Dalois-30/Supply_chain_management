
exports.add = (req, res) => {
    console.log("**** post /addProduct ****");
    // name, phoneNo, cityState, country
    var location = [];
    location[0] = req.body.longitude;
    location[1] = req.body.latitude;
    console.log(req.body);
    
    utility.addProduct(req.body.serialNo, location, function(answer){
      res.send(answer);
      
    })
    
}

exports.getAll = (req, res) => {
    console.log("**** get /Products ****");
    utility.allProducts(function(answer){
      res.send(answer);
    })
      
}

exports.getOne = (req, res) => {
    console.log("**** get /Producer ****");
    utility.findProduct(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.delete = (req, res) => {
    console.log("**** delete /Producer ****");
    utility.removeProduct(req.params.id, function(answer){
      res.send(answer);
    })
      
}
