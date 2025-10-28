// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Governance.sol";

/**
 * @title Bank
 * @dev A smart contract for simulating banking operations including deposits, withdrawals, and transfers
 * @notice This contract provides basic banking functionality with governance integration
 */
contract Bank {
    // ============ STRUCTS ============
    
    struct Transaction {
        uint256 id;
        string action; // "Deposit", "Withdrawal", "Transfer In", "Transfer Out"
        uint256 amount;
        address from;
        address to;
        uint256 timestamp;
        bool isComplete;
    }
    
    struct TokenHolder {
        address holder;
        uint256 balance;
    }
    
    // ============ STATE VARIABLES ============
    
    mapping(address => uint256) public balances;
    mapping(address => Transaction[]) public userTransactions;
    TokenHolder[] public topHolders;
    
    uint256 public totalValueLocked;
    uint256 private transactionCounter;
    
    Governance public governance;
    
    // ============ EVENTS ============
    
    event Deposit(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed user, uint256 amount, uint256 timestamp);
    event Transfer(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
    event TokenMinted(address indexed to, uint256 amount, uint256 timestamp);
    
    // ============ MODIFIERS ============
    
    modifier onlyGovernance() {
        require(msg.sender == address(governance), "Only governance can call this");
        _;
    }
    
    modifier validAddress(address _address) {
        require(_address != address(0), "Invalid address");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    constructor() {
        governance = new Governance();
    }
    
    // ============ DEPOSIT & WITHDRAWAL FUNCTIONS ============
    
    /**
     * @notice Deposit funds into the bank
     * @dev Creates a deposit transaction and mints tokens
     */
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        
        balances[msg.sender] += msg.value;
        totalValueLocked += msg.value;
        
        Transaction memory newTx = Transaction({
            id: transactionCounter++,
            action: "Deposit",
            amount: msg.value,
            from: msg.sender,
            to: msg.sender,
            timestamp: block.timestamp,
            isComplete: true
        });
        
        userTransactions[msg.sender].push(newTx);
        updateTopHolders();
        
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @notice Withdraw funds from the bank
     * @dev Creates a withdrawal transaction and sends funds to user
     */
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(amount > 0, "Withdrawal amount must be greater than 0");
        
        balances[msg.sender] -= amount;
        totalValueLocked -= amount;
        
        Transaction memory newTx = Transaction({
            id: transactionCounter++,
            action: "Withdrawal",
            amount: amount,
            from: msg.sender,
            to: address(0),
            timestamp: block.timestamp,
            isComplete: true
        });
        
        userTransactions[msg.sender].push(newTx);
        updateTopHolders();
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @notice Transfer funds to another address
     * @param to The recipient address
     * @param amount The amount to transfer
     */
    function transfer(address to, uint256 amount) external validAddress(to) {
        require(to != msg.sender, "Cannot transfer to yourself");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(amount > 0, "Transfer amount must be greater than 0");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        // Create transaction for sender
        Transaction memory senderTx = Transaction({
            id: transactionCounter++,
            action: "Transfer Out",
            amount: amount,
            from: msg.sender,
            to: to,
            timestamp: block.timestamp,
            isComplete: true
        });
        
        userTransactions[msg.sender].push(senderTx);
        
        // Create transaction for receiver
        Transaction memory receiverTx = Transaction({
            id: transactionCounter++,
            action: "Transfer In",
            amount: amount,
            from: msg.sender,
            to: to,
            timestamp: block.timestamp,
            isComplete: true
        });
        
        userTransactions[to].push(receiverTx);
        updateTopHolders();
        
        emit Transfer(msg.sender, to, amount, block.timestamp);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @notice Get balance of an address
     * @param user The address to query
     * @return The balance of the address
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
    
    /**
     * @notice Get transaction history for an address
     * @param user The address to query
     * @return An array of transactions for the user
     */
    function getUserTransactions(address user) external view returns (Transaction[] memory) {
        return userTransactions[user];
    }
    
    /**
     * @notice Get total number of transactions
     * @return The total transaction count
     */
    function getTotalTransactions() external view returns (uint256) {
        return transactionCounter;
    }
    
    /**
     * @notice Get top token holders
     * @return An array of top holders
     */
    function getTopHolders() external view returns (TokenHolder[] memory) {
        return topHolders;
    }
    
    // ============ INTERNAL FUNCTIONS ============
    
    /**
     * @notice Update the top holders list
     * @dev Maintains a sorted list of top holders
     */
    function updateTopHolders() internal {
        // Find index if user already exists
        bool found = false;
        uint256 index = 0;
        
        for (uint256 i = 0; i < topHolders.length; i++) {
            if (topHolders[i].holder == msg.sender) {
                found = true;
                index = i;
                break;
            }
        }
        
        if (found) {
            topHolders[index].balance = balances[msg.sender];
        } else {
            topHolders.push(TokenHolder({
                holder: msg.sender,
                balance: balances[msg.sender]
            }));
        }
        
        // Sort by balance (descending)
        for (uint256 i = 0; i < topHolders.length - 1; i++) {
            for (uint256 j = i + 1; j < topHolders.length; j++) {
                if (topHolders[j].balance > topHolders[i].balance) {
                    TokenHolder memory temp = topHolders[i];
                    topHolders[i] = topHolders[j];
                    topHolders[j] = temp;
                }
            }
        }
        
        // Keep only top 10 holders
        if (topHolders.length > 10) {
            for (uint256 i = 10; i < topHolders.length; i++) {
                delete topHolders[i];
            }
            assembly {
                mstore(topHolders, 10)
            }
        }
    }
    
    /**
     * @notice Mint tokens to an address
     * @dev Only callable by governance
     * @param to The address to mint to
     * @param amount The amount to mint
     */
    function mintTokens(address to, uint256 amount) external onlyGovernance validAddress(to) {
        require(amount > 0, "Amount must be greater than 0");
        
        balances[to] += amount;
        totalValueLocked += amount;
        
        emit TokenMinted(to, amount, block.timestamp);
    }
    
    // ============ RECEIVE FUNCTION ============
    
    receive() external payable {
        deposit();
    }
    
    fallback() external payable {
        deposit();
    }
}

