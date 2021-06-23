pragma solidity ^0.8.0;

contract ContractRecord {
  address public contractOwner;
  mapping(address => bool) public contractSigners;
  bytes32 public documentHash;

//   struct ContractSigner {
//     address _address;
//     bool signed;
//   }

  constructor() {
    contractOwner = msg.sender;
  }

  //event TransactionPerformed();

//callable by contract administrator?
//visibility type
  function setDocumentHash(bytes32 _documentHash) public {
    documentHash = _documentHash;
  }

  function setSigner(address _address) public {
    //documentHash = _documentHash;
  }

    //visibility/modifiers
    function signContract(address _address) {

    }

//   modifier sellerOnly() {
//     require(msg.sender == seller, "only seller can send this message");
//     _;
//   }

//   modifier buyerOrSellerOnly() {
//     require(msg.sender == buyer || msg.sender == seller, "only buyer or seller can send this message");
//     _;
//   }

//   modifier buyerOnly() {
//     require(msg.sender == buyer, "only buyer can send this message");
//     _;
//   }

//   modifier preventIncompleteAssent() {
//     require(sellerAssent == true && buyerAssent == true);
//     _;
//   }

//   modifier preventIncompleteAssent() {
//     require(sellerAssent == true && buyerAssent == true);
//     _;
//   }

//   /**
//   functions with this modifier could change contract state to fully performed
//   */
//   modifier performanceReviewed() {
//     _;
//     if (propertyReceived && address(this).balance == salePrice) {
//       fullyPerformed = true;
//       emit TransactionPerformed();
//     }
//   }

}
