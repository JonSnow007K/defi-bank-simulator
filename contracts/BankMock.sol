// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BankMock
 * @dev Mock contract for testing and development without actual governance
 * @notice Simplified banking contract without governance integration
 */
contract BankMock {
    // ============ STRUCTS ============
    
    struct Transaction {
        uint256 id;
        string action;
        uint256 amount;
        address from;
        address to;
        uint256 timestamp;
        bool isComplete;
    }
    
    // ============ STATE VARIABLES ============
    
    mapping(address => uint256) public balances;
    mapping(address => Transaction[]) public userTransactions;
    
    uint256 public totalValueLocked;
    uint256 private transactionCounter;
    
    // ============ EVENTS ============
    
    event Deposit(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed user, uint256 amount, uint256 timestamp);
    event Transfer(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
    
    // ============ DEPOSIT & WITHDRAWAL FUNCTIONS ============
    
    /**
     * @notice Deposit funds into the bank
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
        
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @notice Withdraw funds from the bank
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
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @notice Transfer funds to another address
     */
    function transfer(address to, uint256 amount) external {
        require(to != address(0), "Invalid address");
        require(to != msg.sender, "Cannot transfer to yourself");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(amount > 0, "Transfer amount must be greater than 0");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
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
        
        emit Transfer(msg.sender, to, amount, block.timestamp);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @notice Get balance of an address
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
    
    /**
     * @notice Get transaction history for an address
     */
    function getUserTransactions(address user) external view returns (Transaction[] memory) {
        return userTransactions[user];
    }
    
    /**
     * @notice Get total number of transactions
     */
    function getTotalTransactions() external view returns (uint256) {
        return transactionCounter;
    }
    
    // ============ RECEIVE FUNCTION ============
    
    receive() external payable {
        deposit();
    }
    
    fallback() external payable {
        deposit();
    }
}

