// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
contract newDefi is Context, AccessControlEnumerable,ERC20, ReentrancyGuard {

    // Staker info
    struct Staker {
        // The deposited tokens of the Staker
        uint256 deposited;
        // 
        uint256 timeOfFristUpdate;
        // Last time of details update for Deposit
        uint256 timeOfLastUpdate;
        // Calculated, but unclaimed rewards. These are calculated each time
        // a user writes to the contract.
        uint256 unclaimedRewards;
    }

     // Rewards per hour. A fraction calculated as x/10.000.000 to get the percentage
    uint256 public rewardsPerHour = 2850; // 0.00285%/h or 25% APR

    uint256 public airDorpAmount = 1000*10**decimals(); 

    // Minimum amount to stake
    uint256 public minStake = 100 * 10**decimals();

    // Mapping of address to Staker info
    mapping(address => Staker) public stakers;

    // Gorilla Address
    address public Token;

    // Total Deposit Amount
    uint256 public totalDepositAmount;

    // Total Reward Amount
    uint256 public totalRewardAmount;

    bytes32 public constant WHITELIST_ROLE = keccak256("WHITELIST_ROLE");

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _mint(_msgSender(),  60_000_000 * 10 ** 18);
        _mint(address(this), 150_000_000 * 10 ** 18);
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

    }

    function claim()external{
        require(hasRole(WHITELIST_ROLE, _msgSender()),"Not WHITELIST_ROLE"); 
        IERC20(address(this)).transfer(_msgSender(), airDorpAmount);
        renounceRole(WHITELIST_ROLE,_msgSender());
    }

    // If address has no Staker struct, initiate one. If address already was a stake,
    // calculate the rewards and add them to unclaimedRewards, reset the last time of
    // deposit and then add _amount to the already deposited amount.
    // Burns the amount staked.
    function deposit(uint256 _amount) external nonReentrant {
        require(_amount >= minStake, "Amount smaller than minimimum deposit");
        require(
            balanceOf(msg.sender) >= _amount,
            "Can't stake more than you own"
        );
        if (stakers[msg.sender].deposited == 0) {
            stakers[msg.sender].deposited = _amount;
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
            stakers[msg.sender].timeOfFristUpdate = block.timestamp;
            stakers[msg.sender].unclaimedRewards = 0;
        } else {
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;
            stakers[msg.sender].deposited += _amount;
            stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        }
        transfer(address(this),_amount);
        totalDepositAmount += _amount;
    }

    // Compound the rewards and reset the last time of update for Deposit info
    function stakeRewards() external nonReentrant {
        require(stakers[msg.sender].deposited > 0, "You have no deposit");
        uint256 rewards = calculateRewards(msg.sender) +
            stakers[msg.sender].unclaimedRewards;
        stakers[msg.sender].unclaimedRewards = 0;
        stakers[msg.sender].deposited += rewards;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        totalDepositAmount += rewards;
    }

    // Mints rewards for msg.sender
    function claimRewards() external nonReentrant {
        require(isTimeUnlock(msg.sender),"Time Early");
        uint256 rewards = calculateRewards(msg.sender) +
            stakers[msg.sender].unclaimedRewards;
        require(rewards > 0, "You have no rewards");
        stakers[msg.sender].unclaimedRewards = 0;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        IERC20(Token).transfer(msg.sender,rewards);
        totalRewardAmount += rewards;
    }

    // Withdraw specified amount of staked tokens
    function withdraw(uint256 _amount) external nonReentrant {
        require(isTimeUnlock(msg.sender),"Time Early");
        require(
            stakers[msg.sender].deposited >= _amount,
            "Can't withdraw more than you have"
        );
        uint256 _rewards = calculateRewards(msg.sender);
        stakers[msg.sender].deposited -= _amount;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        stakers[msg.sender].unclaimedRewards = _rewards;
        IERC20(Token).transfer(msg.sender,_rewards);
        totalRewardAmount += _rewards;
    }

    // Withdraw all stake and rewards and mints them to the msg.sender
    function withdrawAll() external nonReentrant {
        require(isTimeUnlock(msg.sender),"Time Early");
        require(stakers[msg.sender].deposited > 0, "You have no deposit");
        uint256 _rewards = calculateRewards(msg.sender) +
            stakers[msg.sender].unclaimedRewards;
        uint256 _deposit = stakers[msg.sender].deposited;
        stakers[msg.sender].deposited = 0;
        stakers[msg.sender].timeOfLastUpdate = 0;
        uint256 _amount = _rewards + _deposit;
         IERC20(Token).transfer(msg.sender,_amount);
        totalRewardAmount += _amount;
    }

    // Function useful for fron-end that returns user stake and rewards by address
    function isTimeUnlock(address _account)public view returns(bool){
        if(stakers[_account].timeOfFristUpdate + 30 days  < block.timestamp   ){
            return true;
        }
        return false;
    }

    function getRewards(address _account)public view returns(uint256){
        return stakers[_account].unclaimedRewards+calculateRewards(_account);
    }
    
    // Calculate the rewards since the last update on Deposit info
    function calculateRewards(address _staker)
        internal
        view
        returns (uint256 rewards)
    {
        return (((((block.timestamp - stakers[_staker].timeOfLastUpdate) *
            stakers[_staker].deposited) * rewardsPerHour) / 3600) / 10000000);
    }

    function grantRoleBatch(bytes32 _role,address[] memory recipients) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),"Not DEFAULT_ADMIN_ROLE "); 
        for(uint256 i =0;i<recipients.length;i++){
            grantRole(_role, recipients[i]);
        }
    }
}
