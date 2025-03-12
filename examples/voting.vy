# @version ^0.3.7

"""
@title Simple Voting Contract
@author Vyper Team
@notice A simple voting contract where each address can vote once
"""

# Struct for storing proposal information
struct Proposal:
    name: String[100]
    vote_count: uint256

# State Variables
chairperson: public(address)
voters: public(HashMap[address, bool])
proposals: public(DynArray[Proposal, 100])

# Events
event ProposalAdded:
    proposal_id: uint256
    name: String[100]

event Voted:
    voter: indexed(address)
    proposal_id: uint256

# Constructor
@external
def __init__(_chairperson: address):
    """
    @notice Contract constructor
    @param _chairperson The address of the chairperson
    """
    self.chairperson = _chairperson

# External functions
@external
def add_proposal(_name: String[100]):
    """
    @notice Add a new proposal
    @param _name The name of the proposal
    """
    assert msg.sender == self.chairperson, "Only chairperson can add proposals"
    
    proposal: Proposal = Proposal({
        name: _name,
        vote_count: 0
    })
    
    self.proposals.append(proposal)
    
    log ProposalAdded(len(self.proposals) - 1, _name)

@external
def vote(_proposal_id: uint256):
    """
    @notice Vote for a proposal
    @param _proposal_id The ID of the proposal to vote for
    """
    assert not self.voters[msg.sender], "Already voted"
    assert _proposal_id < len(self.proposals), "Invalid proposal ID"
    
    self.voters[msg.sender] = True
    self.proposals[_proposal_id].vote_count += 1
    
    log Voted(msg.sender, _proposal_id)

@external
@view
def winning_proposal() -> uint256:
    """
    @notice Get the ID of the winning proposal
    @return The ID of the proposal with the most votes
    """
    winning_vote_count: uint256 = 0
    winning_id: uint256 = 0
    
    for i in range(len(self.proposals)):
        if self.proposals[i].vote_count > winning_vote_count:
            winning_vote_count = self.proposals[i].vote_count
            winning_id = i
    
    return winning_id

@external
@view
def winner_name() -> String[100]:
    """
    @notice Get the name of the winning proposal
    @return The name of the proposal with the most votes
    """
    return self.proposals[self.winning_proposal()].name

@external
@view
def proposal_count() -> uint256:
    """
    @notice Get the number of proposals
    @return The number of proposals
    """
    return len(self.proposals)

@external
@view
def has_voted(_voter: address) -> bool:
    """
    @notice Check if an address has voted
    @param _voter The address to check
    @return True if the address has voted, False otherwise
    """
    return self.voters[_voter]

@external
@view
def get_proposal(_proposal_id: uint256) -> (String[100], uint256):
    """
    @notice Get information about a proposal
    @param _proposal_id The ID of the proposal
    @return The name and vote count of the proposal
    """
    assert _proposal_id < len(self.proposals), "Invalid proposal ID"
    
    return (self.proposals[_proposal_id].name, self.proposals[_proposal_id].vote_count)
