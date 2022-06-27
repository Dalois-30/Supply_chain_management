
exports.add = (req, res) => {
    console.log("**** post /addProducer ****");
    // name, phoneNo, cityState, country
    console.log(req.body);
    
    utility.addProducer(req.body.name, req.body.phoneNo, req.body.cityState, req.body.country, function(answer){
      res.send(answer);
      
    })
    
}

exports.getAll = (req, res) => {
    console.log("**** get /Producer ****");
    utility.allProducers(function(answer){
      res.send(answer);
    })
      
}

exports.getOne = (req, res) => {
    console.log("**** get /Producer ****");
    utility.findProducer(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.update = (req, res) => {
    console.log("**** put /Producer ****");
    utility.certifyProducer(req.params.id, function(answer){
      res.send(answer);
    })
      
}

exports.delete = (req, res) => {
    console.log("**** delete /Producer ****");
    utility.removeProducer(req.params.id, function(answer){
      res.send(answer);
    })
      
}