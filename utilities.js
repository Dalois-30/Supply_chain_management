
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
var web3;

// transformer ce fichier en une classe afin de pouvoir l'exporter facilement

//const { ethers } = require("ethers");

utility = {
    
    web3Provider:null,
    contracts : {},
    connect: async function() {
        // Modern dapp browsers...
        if (window.ethereum) {
            utility.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({ method: "eth_requestAccounts" });
            } catch (error) {
                // User denied account access...
                console.log(error);
                console.log("User denied account access")
            }
            document.getElementById("connectButton").innerHTML = "Connected";
            const accounts = await ethereum.request({ method: "eth_accounts" });
            console.log(accounts);
        }
        // Legacy dapp browser...
        else if (window.web3) {
            utility.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            utility.web3Provider = new Web3.provider.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(utility.web3Provider);
        return execute();
    },

    initContracts: async function() {

        $.getJSON('./build/contracts/Provenance.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            var ProvenanceArtifact = data;
            utility.contracts.Provenance = TruffleContract(ProvenanceArtifact);

            // Set the provider for our contract
            utility.contracts.Provenance.setProvider(utility.web3Provider);
        });
        $.getJSON('./build/contracts/Tracking.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            var TrackingArtifact = data;
            utility.contracts.Tracking = TruffleContract(TrackingArtifact);

            // Set the provider for our contract
            utility.contracts.Tracking.setProvider(utility.web3Provider);
        });
        $.getJSON('./build/contracts/Reputation.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            var ReputationArtifact = data;
            utility.contracts.Reputation = TruffleContract(ReputationArtifact);

            // Set the provider for our contract
            utility.contracts.Reputation.setProvider(utility.web3Provider);
        });
    },
    
    addProducer: async function(name, phoneNo, cityState, country) {

        var ProvenanceInstance;
        web3.eth.getAccounts(function(error, accounts){
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
        web3.eth.getAccounts(function(error, accounts){
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
        web3.eth.getAccounts(function(error, accounts){
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
        web3.eth.getAccounts(function(error, accounts){
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
        web3.eth.getAccounts(function(error, accounts){
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
        web3.eth.getAccounts(function(error, accounts){
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
        web3.eth.getAccounts(function(error, accounts){
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
    }

}














