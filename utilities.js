
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

    addProducer: async function(name, phoneNo, cityState, country) {

        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }
      
            var account = accounts[0];
      
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.addProducer(name, phoneNo, cityState, country ,{from: account});
            }).then(function(result){
              console.log("Producer successfull added to the blockchain");
            }).catch(function(err){
              console.log(err.message);
            });
        });
    },

    removeProducer: async function(address){
        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }
      
            var account = accounts[0];
      
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.removeProducer(address, {from: account});
            }).then(function(result){
              console.log("Producer successfull removed to the blockchain");
            }).catch(function(err){
              console.log(err.message);
            });
        });
    },

    findProducer: async function(address){
        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }
            
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.findProducer(address).call();
            }).catch(function(err){
              console.log(err.message);
            });
        });
    },

    certifyProducer: async function(address){
        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.certifyProducer(address, {from: account});
            }).catch(function(err){
              console.log(err.message);
            });
        });  
    },

    addProduct : async function(seriaNo, locationData){
        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.addProduct(seriaNo, locationData, {from: account});
            }).catch(function(err){
              console.log(err.message);
            });
        });    
    },

    removeProduct : function(seriaNo){
        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.removeProduct(seriaNo, {from: account});
            }).catch(function(err){
              console.log(err.message);
            });
        });    
    }, 

    findProduct: function(seriaNo){
        var ProvenanceInstance;
        self.web3.eth.getAccounts(function(error, accounts){
            if (error) {
              console.log(error);
            }

            var account = accounts[0];
            utility.contracts.Provenance.deployed().then(function(instance){
              ProvenanceInstance = instance;
      
              // Execute adopt as a transaction by sending account
              return ProvenanceInstance.findProduct(seriaNo).call();
            }).catch(function(err){
              console.log(err.message);
            });
        });   
    },

    // CONTRACT TRACKING

    sendToken: function(address, amount){
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.sendToken(address, amount, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      }); 
    },

    getBalance: function(address){
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.getBalance(address).call();
          }).catch(function(err){
            console.log(err.message);
          });
      }); 
    },

    getBalance: function(address){
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.recoverToken(address, amount, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    recoverToken: function(address, amount){
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.recoverToken(address, amount, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    setContractParameters: function(location1, location2, leadTime, payment){
      var location = [location1, location2];
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.setContractParameters(location, leadTime, payment, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    sendShipment: function(trackinNo, item, quantity, location1, location2){
      var TrakingInstance;
      var location = [location1, location2];
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.sendShipment(trackinNo, item, quantity, location, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }, 

    recieveShipment: function(trackinNo, item, quantity, location1, location2){
      var TrakingInstance;
      var location = [location1, location2];
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.receiveShipment(trackinNo, item, quantity, location, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    deleteShipment: function(trackinNo){
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Tracking.deployed().then(function(instance){
            TrakingInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return TrakingInstance.deleteShipment(trackinNo, {from: account});
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    calculateReputation: function(address){
      var TrakingInstance;
      self.web3.eth.getAccounts(function(error, accounts){
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
      self.web3.eth.getAccounts(function(error, accounts){
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
      self.web3.eth.getAccounts(function(error, accounts){
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
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.findSupplier(address).call();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }, 
    
    allSuppliers: function(){
      var ReputationInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.allSupplier().call();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    filterByGoodsType: function(goodsType){
      var ReputationInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.filterByGoodsType(goodsType).call();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }, 

    filterByReputation: function(reputation){
      var ReputationInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.filterByReputation(reputation).call();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    checkReputation: function(address){
      var ReputationInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.checkReputation(address).call();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    },

    updateReputation: function(){
      var ReputationInstance;
      self.web3.eth.getAccounts(function(error, accounts){
          if (error) {
            console.log(error);
          }

          var account = accounts[0];
          utility.contracts.Reputation.deployed().then(function(instance){
            ReputationInstance = instance;
    
            // Execute adopt as a transaction by sending account
            return ReputationInstance.updateReputation({from : account}).call();
          }).catch(function(err){
            console.log(err.message);
          });
      });
    }

}

module.exports = utility;














