// modules/07_add_builtins.js

module.exports = function (grammar, utils) {
    const {addRule, modifyRule} = utils;
    
    // Add Vyper built-in variables and functions
    addRule(grammar, 'vyper_builtin', {
        type: 'CHOICE',
        members: [
            // Block properties
            { type: 'STRING', value: 'block.coinbase' },
            { type: 'STRING', value: 'block.difficulty' },
            { type: 'STRING', value: 'block.number' },
            { type: 'STRING', value: 'block.timestamp' },
            { type: 'STRING', value: 'block.gaslimit' },
            { type: 'STRING', value: 'block.chainid' },
            { type: 'STRING', value: 'block.basefee' },
            { type: 'STRING', value: 'block.prevhash' },
            
            // Transaction properties
            { type: 'STRING', value: 'msg.sender' },
            { type: 'STRING', value: 'msg.value' },
            { type: 'STRING', value: 'msg.gas' },
            { type: 'STRING', value: 'tx.origin' },
            { type: 'STRING', value: 'tx.gasprice' },
            
            // Chain properties
            { type: 'STRING', value: 'chain.id' },
            { type: 'STRING', value: 'chain.network' },
            
            // Built-in functions
            { type: 'STRING', value: 'assert' },
            { type: 'STRING', value: 'min' },
            { type: 'STRING', value: 'max' },
            { type: 'STRING', value: 'sha256' },
            { type: 'STRING', value: 'keccak256' },
            { type: 'STRING', value: 'ecrecover' },
            { type: 'STRING', value: 'ecadd' },
            { type: 'STRING', value: 'ecmul' },
            { type: 'STRING', value: 'extract32' },
            { type: 'STRING', value: 'as_wei_value' },
            { type: 'STRING', value: 'convert' },
            { type: 'STRING', value: 'selfdestruct' },
            { type: 'STRING', value: 'raw_call' },
            { type: 'STRING', value: 'create_forwarder_to' },
            { type: 'STRING', value: 'blockhash' },
            { type: 'STRING', value: 'method_id' },
            
            // Math functions
            { type: 'STRING', value: 'floor' },
            { type: 'STRING', value: 'ceil' },
            { type: 'STRING', value: 'abs' },
            { type: 'STRING', value: 'sqrt' },
            { type: 'STRING', value: 'pow' },
            { type: 'STRING', value: 'exp' },
            { type: 'STRING', value: 'log' },
            
            // Array functions
            { type: 'STRING', value: 'len' },
            { type: 'STRING', value: 'concat' },
            { type: 'STRING', value: 'slice' },
            
            // Ethereum units
            { type: 'STRING', value: 'wei' },
            { type: 'STRING', value: 'gwei' },
            { type: 'STRING', value: 'ether' },
            
            // Special variables
            { type: 'STRING', value: 'self' },
            { type: 'STRING', value: 'this' },
            { type: 'STRING', value: 'empty' },
            
            // Constants
            { type: 'STRING', value: 'ZERO_ADDRESS' },
            { type: 'STRING', value: 'MAX_UINT256' },
            { type: 'STRING', value: 'EMPTY_BYTES32' },
        ]
    });
    
    // Add built-ins to primary_expression
    modifyRule(grammar, 'primary_expression', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'identifier' },
            { type: 'SYMBOL', name: 'string' },
            { type: 'SYMBOL', name: 'concatenated_string' },
            { type: 'SYMBOL', name: 'integer' },
            { type: 'SYMBOL', name: 'float' },
            { type: 'SYMBOL', name: 'true' },
            { type: 'SYMBOL', name: 'false' },
            { type: 'SYMBOL', name: 'none' },
            { type: 'SYMBOL', name: 'parenthesized_expression' },
            { type: 'SYMBOL', name: 'ellipsis' },
            { type: 'SYMBOL', name: 'vyper_builtin' }, // Add built-ins
        ]
    });
    
    // Add unit types for numeric literals
    addRule(grammar, 'unit_type', {
        type: 'CHOICE',
        members: [
            { type: 'STRING', value: 'wei' },
            { type: 'STRING', value: 'gwei' },
            { type: 'STRING', value: 'ether' },
            { type: 'STRING', value: 'seconds' },
            { type: 'STRING', value: 'minutes' },
            { type: 'STRING', value: 'hours' },
            { type: 'STRING', value: 'days' },
            { type: 'STRING', value: 'weeks' },
        ]
    });
    
    // Add numeric literal with unit
    addRule(grammar, 'numeric_literal_with_unit', {
        type: 'SEQ',
        members: [
            { 
                type: 'CHOICE', 
                members: [
                    { type: 'SYMBOL', name: 'integer' },
                    { type: 'SYMBOL', name: 'float' }
                ]
            },
            { type: 'SYMBOL', name: 'unit_type' }
        ]
    });
    
    // Add numeric literal with unit to primary_expression
    modifyRule(grammar, 'primary_expression', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'identifier' },
            { type: 'SYMBOL', name: 'string' },
            { type: 'SYMBOL', name: 'concatenated_string' },
            { type: 'SYMBOL', name: 'integer' },
            { type: 'SYMBOL', name: 'float' },
            { type: 'SYMBOL', name: 'numeric_literal_with_unit' }, // Add numeric literals with units
            { type: 'SYMBOL', name: 'true' },
            { type: 'SYMBOL', name: 'false' },
            { type: 'SYMBOL', name: 'none' },
            { type: 'SYMBOL', name: 'parenthesized_expression' },
            { type: 'SYMBOL', name: 'ellipsis' },
            { type: 'SYMBOL', name: 'vyper_builtin' },
        ]
    });
    
    return grammar;
};
