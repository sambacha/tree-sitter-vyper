# @version ^0.3.7

"""
@title Interface and Enum Example
@author Vyper Team
@notice Demonstrates interfaces and enums in Vyper
"""

# Define an enum for different token types
enum TokenType:
    ERC20
    ERC721
    ERC1155

# Define an interface for a token registry
interface TokenRegistry:
    def register_token(token_address: address, token_type: uint8): nonpayable
    def get_token_type(token_address: address) -> uint8: view
    def is_registered(token_address: address) -> bool: view
    def get_token_count() -> uint256: view

# State Variables
owner: public(address)
token_types: public(HashMap[address, TokenType])
registered_tokens: public(DynArray[address, 100])

# Events
event TokenRegistered:
    token_address: indexed(address)
    token_type: TokenType

# Constants
ZERO_ADDRESS: constant(address) = 0x0000000000000000000000000000000000000000

# Constructor
@external
def __init__():
    """
    @notice Contract constructor
    """
    self.owner = msg.sender

# External functions
@external
def register_token(token_address: address, token_type: TokenType):
    """
    @notice Register a new token
    @param token_address The address of the token contract
    @param token_type The type of the token
    """
    assert msg.sender == self.owner, "Only owner can register tokens"
    assert token_address != ZERO_ADDRESS, "Cannot register zero address"
    assert not self.is_registered(token_address), "Token already registered"
    
    self.token_types[token_address] = token_type
    self.registered_tokens.append(token_address)
    
    log TokenRegistered(token_address, token_type)

@external
@view
def get_token_type(token_address: address) -> TokenType:
    """
    @notice Get the type of a token
    @param token_address The address of the token contract
    @return The type of the token
    """
    assert self.is_registered(token_address), "Token not registered"
    
    return self.token_types[token_address]

@external
@view
def is_registered(token_address: address) -> bool:
    """
    @notice Check if a token is registered
    @param token_address The address of the token contract
    @return True if the token is registered, False otherwise
    """
    return self.token_types[token_address] != empty(TokenType)

@external
@view
def get_token_count() -> uint256:
    """
    @notice Get the number of registered tokens
    @return The number of registered tokens
    """
    return len(self.registered_tokens)

@external
@view
def get_token_at_index(index: uint256) -> address:
    """
    @notice Get the address of a token at a specific index
    @param index The index of the token
    @return The address of the token
    """
    assert index < len(self.registered_tokens), "Index out of bounds"
    
    return self.registered_tokens[index]

@external
def transfer_ownership(new_owner: address):
    """
    @notice Transfer ownership of the contract
    @param new_owner The address of the new owner
    """
    assert msg.sender == self.owner, "Only owner can transfer ownership"
    assert new_owner != ZERO_ADDRESS, "Cannot transfer to zero address"
    
    self.owner = new_owner

# Implements the TokenRegistry interface
implements: TokenRegistry
