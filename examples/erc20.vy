# @version ^0.3.7

"""
@title Basic ERC20 Token Implementation
@author Vyper Team
@notice A simple ERC20 token contract
"""

from vyper.interfaces import ERC20

implements: ERC20

# Events
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    value: uint256

event Approval:
    owner: indexed(address)
    spender: indexed(address)
    value: uint256

# State Variables
name: public(String[32])
symbol: public(String[8])
decimals: public(uint8)
totalSupply: public(uint256)

balanceOf: public(HashMap[address, uint256])
allowance: public(HashMap[address, HashMap[address, uint256]])

# Constants
ZERO_ADDRESS: constant(address) = 0x0000000000000000000000000000000000000000

# Constructor
@external
def __init__(_name: String[32], _symbol: String[8], _decimals: uint8, _initialSupply: uint256):
    """
    @notice Contract constructor
    @param _name Token name
    @param _symbol Token symbol
    @param _decimals Token decimals
    @param _initialSupply Initial token supply
    """
    self.name = _name
    self.symbol = _symbol
    self.decimals = _decimals
    self.totalSupply = _initialSupply * 10 ** convert(_decimals, uint256)
    self.balanceOf[msg.sender] = self.totalSupply
    
    log Transfer(ZERO_ADDRESS, msg.sender, self.totalSupply)

# External functions
@external
def transfer(_to: address, _value: uint256) -> bool:
    """
    @notice Transfer tokens to a specified address
    @param _to The address to transfer to
    @param _value The amount to be transferred
    @return Success boolean
    """
    assert _to != ZERO_ADDRESS, "ERC20: transfer to the zero address"
    assert _value <= self.balanceOf[msg.sender], "ERC20: transfer amount exceeds balance"
    
    self.balanceOf[msg.sender] -= _value
    self.balanceOf[_to] += _value
    
    log Transfer(msg.sender, _to, _value)
    
    return True

@external
def transferFrom(_from: address, _to: address, _value: uint256) -> bool:
    """
    @notice Transfer tokens from one address to another
    @param _from The address which you want to send tokens from
    @param _to The address which you want to transfer to
    @param _value The amount of tokens to be transferred
    @return Success boolean
    """
    assert _from != ZERO_ADDRESS, "ERC20: transfer from the zero address"
    assert _to != ZERO_ADDRESS, "ERC20: transfer to the zero address"
    assert _value <= self.balanceOf[_from], "ERC20: transfer amount exceeds balance"
    assert _value <= self.allowance[_from][msg.sender], "ERC20: transfer amount exceeds allowance"
    
    self.balanceOf[_from] -= _value
    self.balanceOf[_to] += _value
    self.allowance[_from][msg.sender] -= _value
    
    log Transfer(_from, _to, _value)
    
    return True

@external
def approve(_spender: address, _value: uint256) -> bool:
    """
    @notice Approve the passed address to spend the specified amount of tokens
    @param _spender The address which will spend the funds
    @param _value The amount of tokens to be spent
    @return Success boolean
    """
    assert _spender != ZERO_ADDRESS, "ERC20: approve to the zero address"
    
    self.allowance[msg.sender][_spender] = _value
    
    log Approval(msg.sender, _spender, _value)
    
    return True

@external
def increaseAllowance(_spender: address, _addedValue: uint256) -> bool:
    """
    @notice Increase the allowance granted to `_spender`
    @param _spender The address which will spend the funds
    @param _addedValue The amount of tokens to increase the allowance by
    @return Success boolean
    """
    assert _spender != ZERO_ADDRESS, "ERC20: approve to the zero address"
    
    self.allowance[msg.sender][_spender] += _addedValue
    
    log Approval(msg.sender, _spender, self.allowance[msg.sender][_spender])
    
    return True

@external
def decreaseAllowance(_spender: address, _subtractedValue: uint256) -> bool:
    """
    @notice Decrease the allowance granted to `_spender`
    @param _spender The address which will spend the funds
    @param _subtractedValue The amount of tokens to decrease the allowance by
    @return Success boolean
    """
    assert _spender != ZERO_ADDRESS, "ERC20: approve to the zero address"
    assert _subtractedValue <= self.allowance[msg.sender][_spender], "ERC20: decreased allowance below zero"
    
    self.allowance[msg.sender][_spender] -= _subtractedValue
    
    log Approval(msg.sender, _spender, self.allowance[msg.sender][_spender])
    
    return True

# Additional functions
@external
def mint(_to: address, _value: uint256) -> bool:
    """
    @notice Mint new tokens
    @dev Only callable by contract owner
    @param _to The address that will receive the minted tokens
    @param _value The amount of tokens to mint
    @return Success boolean
    """
    assert msg.sender == self.owner, "Only owner can mint"
    assert _to != ZERO_ADDRESS, "ERC20: mint to the zero address"
    
    self.totalSupply += _value
    self.balanceOf[_to] += _value
    
    log Transfer(ZERO_ADDRESS, _to, _value)
    
    return True

@external
def burn(_value: uint256) -> bool:
    """
    @notice Burn tokens
    @param _value The amount of tokens to burn
    @return Success boolean
    """
    assert _value <= self.balanceOf[msg.sender], "ERC20: burn amount exceeds balance"
    
    self.balanceOf[msg.sender] -= _value
    self.totalSupply -= _value
    
    log Transfer(msg.sender, ZERO_ADDRESS, _value)
    
    return True
