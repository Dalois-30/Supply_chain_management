
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
//var web3;
const ProvenanceArtifact = require('./build/contracts/Provenance.json');
const TrackingArtifact = require('./build/contracts/Tracking.json');
const ReputationArtifact = require('./build/contracts/Reputation.json');
// transformer ce fichier en une classe afin de pouvoir l'exporter facilement
//const { ethers } = require("ethers");

utility = {

    
    contracts : {},


    initContracts: async function(callback) {
      var self = this;

      utility.contracts.Tracking = TruffleContract(TrackingArtifact)
      utility.contracts.Provenance = TruffleContract(ProvenanceArtifact)
      utility.contracts.Reputation = TruffleContract(ReputationArtifact)

      utility.contracts.Provenance.setProvider(self.web3.currentProvider);
      utility.contracts.Tracking.setProvider(self.web3.currentProvider);
      utility.contracts.Reputation.setProvider(self.web3.currentProvider);
     
      
      self.web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          console.log("There was an error fetching your accounts.");
          return;
        }
  
        if (accs.length == 0) {
          console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }
        self.accounts = accs;
        self.account = self.accounts[2];
  
        callback(self.accounts);
      });
      
  
    },
    
    // CONTRACT PROVENANCE

    addProducer: async function(name, phoneNo, cityState, country, callback) {
      utility.contracts.Provenance.setProvider(this.web3.currentProvider);

        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }
      
            var account = accounts[0];
      
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.addProducer(name, phoneNo, cityState, country ,{from: account});
            }).then(function(result){
              console.log(result);
              callback(result);
              console.log("Producer successfull added to the blockchain");
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });
    },

    removeProducer: async function(address, callback){
        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }
      
            var account = accounts[0];
      
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.removeProducer(address, {from: account});
            }).then(function(result){
              console.log(result)
              callback(result);
              console.log("Producer successfull removed to the blockchain");
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });
    },

    findProducer: async function(address, callback){
        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }
            
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.findProducer(address);
            }).then(function(result){

              console.log('producer');
              result[1] = result[1].toNumber()
              console.log(result);
              callback(result);
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });
    },

    allProducers: async function(callback){
      var ProvenanceInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }
          
          var account = accounts[0];
          utility.contracts.Provenance.deployed().then(function(instance){
            ProvenanceInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ProvenanceInstance.allProducers();
          }).then(function(result){
            console.log("list of all producer");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    certifyProducer: async function(address, callback){
        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.certifyProducer(address, {from: account});
            }).then(function(result){
              console.log("producer certified");
              console.log(result);
              callback(result);
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });  
    },

    addProduct : async function(seriaNo, locationData, callback){
        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.addProduct(seriaNo, locationData, {from: account});
            }).then(function(result){
              console.log("product added");
              console.log(result);
              callback(result);
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });    
    },

    removeProduct : function(seriaNo, callback){
        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.removeProduct(seriaNo, {from: account});
            }).then(function(result){
              console.log("product removed");
              console.log(result);
              callback(result);
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });    
    }, 

    findProduct: function(seriaNo, callback){
        var ProvenanceInstance;
        this.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.findProduct(seriaNo);
            }).then(function(result){
              console.log("product");
              result[1][0]=result[1][0].toNumber();
              result[1][1]=result[1][1].toNumber();
              result[2]=result[2].toNumber()
              console.log(result);
              callback(result);
            }).catch(function(err){
              console.log(err.message);
              callback("ERROR 404")
            });
        });   
    },

    allProducts: async function(callback){
      var ProvenanceInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }
          
          utility.contracts.Provenance.deployed().then(function(instance){
            ProvenanceInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ProvenanceInstance.allProducts();
          }).then(function(result){
            console.log("all products");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    // CONTRACT TRACKING

    sendToken: function(address, amount, callback){
      var TrakingInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.sendToken(address, amount, {from: account});
          }).then(function(result){
            console.log("Token send");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      }); 
    },

    getBalance: function(address, callback){
      var TrakingInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.getBalance(address);
          }).then(function(result){
            console.log("balance");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      }); 
    },


    recoverToken: function(address, amount, callback){
      var TrakingInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.recoverToken(address, amount, {from: account});
          }).then(function(result){
            console.log("token recovered");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    setContractParameters: function(location1, location2, leadTime, payment, callback){
      var location = [location1, location2];
      var TrakingInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.setContractParameters(location, leadTime, payment, {from: account});
          }).then(function(result){
            console.log("parameters setted");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    sendShipment: function(trackinNo, item, quantity, location1, location2){
      var TrakingInstance;
      var location = [location1, location2];
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.sendShipment(trackinNo, item, quantity, location, {from: account});
          }).then(function(result){
            console.log("shipment send");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    }, 

    recieveShipment: function(trackinNo, item, quantity, location1, location2){
      var TrakingInstance;
      var location = [location1, location2];
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.receiveShipment(trackinNo, item, quantity, location, {from: account});
          }).then(function(result){
            console.log("recive shipment");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    deleteShipment: function(trackinNo){
      var TrakingInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.deleteShipment(trackinNo, {from: account});
          }).then(function(result){
            console.log("all products");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    checkShipment: function(trackingNo, callback){
      var ProvenanceInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Provenance.deployed().then(function(instance){
            ProvenanceInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ProvenanceInstance.checkShipment(trackingNo);
          }).then(function(result){
            console.log("shipment");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });   
    },

    checkSuccess: function(address, callback){
      var ProvenanceInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Provenance.deployed().then(function(instance){
            ProvenanceInstance = instance;
          
            // Execute adopt as a transaction by sending account
            return ProvenanceInstance.checkSuccess(address);
          }).then(function(result){
            console.log("shipment");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });   
    },

    allShipment: async function(callback){
      var ProvenanceInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          utility.contracts.Provenance.deployed().then(function(instance){
            ProvenanceInstance = instance;
          
            // Execute adopt as a transaction by sending account
            return ProvenanceInstance.allShipment();
          }).then(function(result){
            console.log("all shipment");
            console.log(result);
            callback(result);
          }).catch(function(err){
            console.log(err.message);
            callback("ERROR 404")
          });
      });
    },

    calculateReputation: function(address){
      var TrakingInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.calculateReputation(address, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },
   

    // CONTRACT REPUTATION
    addSupplier: function(name, phoneNo, cityState, country, goodsType){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.addSupplier(name, phoneNo, cityState, country, goodsType, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    removeSupplier: function(address){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.removeSupplier(address, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }, 

    findSupplier: function(address){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.findSupplier(address);
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }, 
    
    allSuppliers: function(){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.allSupplier();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    filterByGoodsType: function(goodsType){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.filterByGoodsType(goodsType);
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }, 

    filterByReputation: function(reputation){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.filterByReputation(reputation);
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    checkReputation: function(address){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.checkReputation(address);
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    updateReputation: function(){
      var ReputationInstance;
      this.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.updateReputation({from : account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }

}

module.exports = utility;














