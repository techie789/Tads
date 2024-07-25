// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AidTracker {
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    struct Request {
        address recipient;
        string description;
        uint256 amount;
        bool fulfilled;
    }

    Donation[] public donations;
    Request[] public requests;

    mapping(address => bool) public verifiedUsers;

    function verifyUser(address _user) public {
        // Assume verification logic with Reclaim Protocol
        verifiedUsers[_user] = true;
    }

    function donate() public payable {
        require(verifiedUsers[msg.sender], "User not verified");
        donations.push(Donation(msg.sender, msg.value, block.timestamp));
    }

    function requestAid(string memory _description, uint256 _amount) public {
        require(verifiedUsers[msg.sender], "User not verified");
        requests.push(Request(msg.sender, _description, _amount, false));
    }

    function fulfillRequest(uint256 _requestId) public {
        require(verifiedUsers[msg.sender], "User not verified");
        Request storage request = requests[_requestId];
        require(!request.fulfilled, "Request already fulfilled");
        require(address(this).balance >= request.amount, "Insufficient balance");
        request.fulfilled = true;
        payable(request.recipient).transfer(request.amount);
    }

    function getDonations() public view returns (Donation[] memory) {
        return donations;
    }

    function getRequests() public view returns (Request[] memory) {
        return requests;
    }
}
