// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Governance
 * @dev A smart contract for managing governance proposals and voting
 * @notice This contract handles proposal creation, voting, and execution
 */
contract Governance {
    // ============ STRUCTS ============
    
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 endDate;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 totalVoters;
        bool isExecuted;
        mapping(address => bool) hasVoted;
    }
    
    // ============ STATE VARIABLES ============
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    
    uint256 public constant VOTING_PERIOD = 14 days;
    uint256 public constant MIN_VOTES_TO_PASS = 1000;
    
    // ============ EVENTS ============
    
    event ProposalCreated(
        uint256 indexed proposalId,
        string title,
        address proposer,
        uint256 endDate
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address voter,
        bool support,
        uint256 votesFor,
        uint256 votesAgainst
    );
    
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    
    // ============ MODIFIERS ============
    
    modifier validProposal(uint256 proposalId) {
        require(proposalId < proposalCount, "Proposal does not exist");
        _;
    }
    
    modifier votingPeriod(uint256 proposalId) {
        require(block.timestamp <= proposals[proposalId].endDate, "Voting period has ended");
        _;
    }
    
    modifier notExecuted(uint256 proposalId) {
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    constructor() {
        proposalCount = 0;
    }
    
    // ============ PROPOSAL FUNCTIONS ============
    
    /**
     * @notice Create a new governance proposal
     * @param title The title of the proposal
     * @param description The description of the proposal
     * @return proposalId The ID of the created proposal
     */
    function createProposal(
        string memory title,
        string memory description
    ) external returns (uint256) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        
        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];
        
        proposal.id = proposalId;
        proposal.title = title;
        proposal.description = description;
        proposal.proposer = msg.sender;
        proposal.endDate = block.timestamp + VOTING_PERIOD;
        proposal.votesFor = 0;
        proposal.votesAgainst = 0;
        proposal.totalVoters = 0;
        proposal.isExecuted = false;
        
        emit ProposalCreated(proposalId, title, msg.sender, proposal.endDate);
        
        return proposalId;
    }
    
    // ============ VOTING FUNCTIONS ============
    
    /**
     * @notice Vote on a proposal
     * @param proposalId The ID of the proposal
     * @param support True to vote for, false to vote against
     */
    function vote(
        uint256 proposalId,
        bool support
    ) external validProposal(proposalId) votingPeriod(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        
        require(!proposal.hasVoted[msg.sender], "Already voted on this proposal");
        
        proposal.hasVoted[msg.sender] = true;
        proposal.totalVoters++;
        
        if (support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        
        emit VoteCast(proposalId, msg.sender, support, proposal.votesFor, proposal.votesAgainst);
    }
    
    /**
     * @notice Vote for a proposal
     * @param proposalId The ID of the proposal
     */
    function voteFor(uint256 proposalId) external {
        vote(proposalId, true);
    }
    
    /**
     * @notice Vote against a proposal
     * @param proposalId The ID of the proposal
     */
    function voteAgainst(uint256 proposalId) external {
        vote(proposalId, false);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @notice Get proposal details
     * @param proposalId The ID of the proposal
     * @return id The proposal ID
     * @return title The proposal title
     * @return description The proposal description
     * @return proposer The address of the proposer
     * @return endDate The end date of voting
     * @return votesFor The number of votes for
     * @return votesAgainst The number of votes against
     * @return totalVoters The total number of voters
     * @return isExecuted Whether the proposal has been executed
     */
    function getProposal(uint256 proposalId) external view validProposal(proposalId) returns (
        uint256 id,
        string memory title,
        string memory description,
        address proposer,
        uint256 endDate,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 totalVoters,
        bool isExecuted
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.proposer,
            proposal.endDate,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.totalVoters,
            proposal.isExecuted
        );
    }
    
    /**
     * @notice Get proposal status
     * @param proposalId The ID of the proposal
     * @return status The status string ("Active", "Passed", "Failed")
     */
    function getProposalStatus(uint256 proposalId) external view validProposal(proposalId) returns (string memory) {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.isExecuted) {
            if (proposal.votesFor > proposal.votesAgainst) {
                return "Passed";
            } else {
                return "Failed";
            }
        }
        
        if (block.timestamp > proposal.endDate) {
            if (proposal.votesFor > proposal.votesAgainst && proposal.votesFor >= MIN_VOTES_TO_PASS) {
                return "Passed";
            } else {
                return "Failed";
            }
        }
        
        return "Active";
    }
    
    /**
     * @notice Check if an address has voted on a proposal
     * @param proposalId The ID of the proposal
     * @param voter The address to check
     * @return Whether the address has voted
     */
    function hasVoted(uint256 proposalId, address voter) external view validProposal(proposalId) returns (bool) {
        return proposals[proposalId].hasVoted[voter];
    }
    
    /**
     * @notice Get total number of proposals
     * @return The total proposal count
     */
    function getTotalProposals() external view returns (uint256) {
        return proposalCount;
    }
}

