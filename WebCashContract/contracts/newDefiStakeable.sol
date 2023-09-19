// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./newDefi.sol";

contract newDefiStakeable is newDefi {
    constructor(string memory _name, string memory _symbol)
        newDefi(_name, _symbol)
    {
       
    }
    // Set rewards per hour as x/10.000.000 (Example: 100.000 = 1%)
    function setRewards(uint256 _rewardsPerHour) public  {
        require(hasRole(DEFAULT_ADMIN_ROLE,_msgSender()),"Not DEFAULT_ADMIN_ROLE");
        rewardsPerHour = _rewardsPerHour;
    }

    // Set the minimum time that has to pass for a user to be able to restake rewards
    function setNewDefiAddress(address  _Token) public  {
        require(hasRole(DEFAULT_ADMIN_ROLE,_msgSender()),"Not DEFAULT_ADMIN_ROLE");
        Token = _Token;
    }

        // Set rewards per hour as x/10.000.000 (Example: 100.000 = 1%)
    function setAirDrop(uint256 _airDorpAmount) public  {
        require(hasRole(DEFAULT_ADMIN_ROLE,_msgSender()),"Not DEFAULT_ADMIN_ROLE");
        airDorpAmount = _airDorpAmount;
    }
}
