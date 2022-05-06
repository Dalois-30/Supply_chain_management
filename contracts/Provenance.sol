
pragma solidity ^0.8.7;

contract Provenance {
    address admin;
    mapping (address => Producer) producers;
    mapping (string => Product) products;

    struct Producer {
        string name;
        uint phoneNo;
        string cityState;
        string country;
        bool certified;
    }
    struct Product {
        address producer;
        uint[] locationData; // array containing lat & long
        uint timeStamp;
    }
    // constructor - runs once when contract is deployed
    constructor() {
        admin = msg.sender;
    }
    // modifier to allow only admin to execute a function
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the admin");
        _;
    }
    // function for producer to add their details to database
    function addProducer(string memory _name, uint _phoneNo, string memory _cityState, string memory _country) public returns (bool success) {
    // don't overwrite existing entries and ensure name isn't null
        if (bytes(producers[msg.sender].name).length == 0 && bytes(_name).length != 0) {
            producers[msg.sender].name = _name;
            producers[msg.sender].phoneNo = _phoneNo;
            producers[msg.sender].cityState = _cityState;
            producers[msg.sender].country = _country;
            producers[msg.sender].certified = false;
            return true;
        }
        else {
            return false; // either entry already exists or name entered was null
        }
    }
    // function to remove producer from database (can only be done by dmin)
    function removeProducer(address _producer) onlyAdmin public returns (bool
        success) {
        delete producers [_producer];
        return true;
    }
    // function to display details of producer
    function findProducer(address _producer) public view returns (string memory, uint, string memory, string memory, bool) {
        require(
                bytes(producers[_producer].name).length > 0 || producers[_producer].phoneNo != 0 ||
                bytes(producers[_producer].cityState).length != 0 || bytes(producers[_producer].country).length != 0,
                "Producer doen't exist"
                );
        return (
            producers[_producer].name, 
            producers[_producer].phoneNo, producers[_producer].cityState,
            producers[_producer].country, producers[_producer].certified
            );
    }
    // function to certify producer as legitimate (can only be done by admin)
    function certifyProducer(address _producer) onlyAdmin public returns (bool success) {
        producers [_producer] .certified = true;
        return true;
    }
    // function for producer to add their product to database
    function addProduct(string memory serialNo, uint[] memory _locationData) public returns (bool success) {
        // ensure no duplicate serial numbers and serial number isn't null
        if (products[serialNo].producer == address(0) && bytes(serialNo).length != 0) {
            products [serialNo].producer = msg.sender;
            products[serialNo].locationData = _locationData;
            products[serialNo].timeStamp = block.timestamp;
            return true;
        }
        else {
            return false; // either serial number already in use or serial number entered was null
        }
    }
    // function to remove product from database (can only be done by admin)
    function removeProduct(string memory serialNo) onlyAdmin public returns (bool success) {
        delete products [serialNo];
        return true;
    }
    // function to display details of product
    function findProduct(string memory serialNo) public view returns (address, uint[] memory, uint) {
        return (products[serialNo].producer, products [serialNo] .locationData, products[serialNo] .timeStamp);
    }
}








