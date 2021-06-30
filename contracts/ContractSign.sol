pragma solidity ^0.8.0;

contract ContractSign{
    event Signed(address indexed contractSigner, string indexed ipfsHash);
    
    function sign(string calldata _ipfsHash) external{
        emit Signed(msg.sender, _ipfsHash);
    }
}