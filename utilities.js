
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
let web3Provider;
var web3;

// transformer ce fichier en une classe afin de pouvoir l'exporter facilement

//const { ethers } = require("ethers");
var contracts = {};

async function connect() {
    // Modern dapp browsers...
    if (window.ethereum) {
        web3Provider = window.ethereum;
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
        web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
        web3Provider = new Web3.provider.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(web3Provider);
    return execute();
}



async function execute() {

    $.getJSON('./build/contracts/Provenance.json', function (data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var ProvenanceArtifact = data;
        contracts.Provenance = TruffleContract(ProvenanceArtifact);

        // Set the provider for our contract
        contracts.Provenance.setProvider(web3Provider);
    });
    $.getJSON('./build/contracts/Tracking.json', function (data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var TrackingArtifact = data;
        contracts.Tracking = TruffleContract(TrackingArtifact);

        // Set the provider for our contract
        contracts.Tracking.setProvider(web3Provider);
    });
    $.getJSON('./build/contracts/Reputation.json', function (data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var ReputationArtifact = data;
        contracts.Reputation = TruffleContract(ReputationArtifact);

        // Set the provider for our contract
        contracts.Reputation.setProvider(web3Provider);
    });
}















