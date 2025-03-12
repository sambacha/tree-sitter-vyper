// modules/10_add_interfaces.js

module.exports = function (grammar, utils) {
    const {addRule, modifyRule} = utils;
    
    // Add interface definition
    addRule(grammar, 'interface_definition', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'interface' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'body', 
                content: { type: 'SYMBOL', name: '_interface_body' } 
            }
        ]
    });
    
    // Add interface body
    addRule(grammar, '_interface_body', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: '\n' },
            { type: 'SYMBOL', name: '_indent' },
            { 
                type: 'REPEAT',
                content: { type: 'SYMBOL', name: 'interface_function' }
            },
            { type: 'SYMBOL', name: '_dedent' }
        ]
    });
    
    // Add interface function
    addRule(grammar, 'interface_function', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'def' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { 
                type: 'FIELD', 
                name: 'parameters', 
                content: { type: 'SYMBOL', name: 'parameters' } 
            },
            { 
                type: 'OPTIONAL',
                content: {
                    type: 'SEQ',
                    members: [
                        { type: 'STRING', value: '->' },
                        { 
                            type: 'FIELD', 
                            name: 'return_type', 
                            content: { type: 'SYMBOL', name: 'type' } 
                        }
                    ]
                }
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'mutability', 
                content: { type: 'SYMBOL', name: 'interface_mutability' } 
            },
            { type: 'STRING', value: '\n' }
        ]
    });
    
    // Add interface mutability
    addRule(grammar, 'interface_mutability', {
        type: 'CHOICE',
        members: [
            { type: 'STRING', value: 'view' },
            { type: 'STRING', value: 'pure' },
            { type: 'STRING', value: 'nonpayable' },
            { type: 'STRING', value: 'payable' }
        ]
    });
    
    // Add implements statement
    addRule(grammar, 'implements_statement', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'implements' },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'interface', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: '\n' }
        ]
    });
    
    // Add implements multiple interfaces statement
    addRule(grammar, 'implements_multiple_statement', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'implements' },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'interfaces', 
                content: { type: 'SYMBOL', name: '_interface_list' } 
            },
            { type: 'STRING', value: '\n' }
        ]
    });
    
    // Add interface list
    addRule(grammar, '_interface_list', {
        type: 'SEQ',
        members: [
            { 
                type: 'FIELD', 
                name: 'interface', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { 
                type: 'REPEAT',
                content: {
                    type: 'SEQ',
                    members: [
                        { type: 'STRING', value: ',' },
                        { 
                            type: 'FIELD', 
                            name: 'interface', 
                            content: { type: 'SYMBOL', name: 'identifier' } 
                        }
                    ]
                }
            },
            { 
                type: 'OPTIONAL', 
                content: { type: 'STRING', value: ',' } 
            }
        ]
    });
    
    // Add import interface statement
    addRule(grammar, 'import_interface_statement', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'from' },
            { 
                type: 'FIELD', 
                name: 'module', 
                content: { type: 'SYMBOL', name: 'dotted_name' } 
            },
            { type: 'STRING', value: 'import' },
            { 
                type: 'FIELD', 
                name: 'interface', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: '\n' }
        ]
    });
    
    // Update _simple_statement to include implements statements
    modifyRule(grammar, '_simple_statement', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'import_statement' },
            { type: 'SYMBOL', name: 'import_from_statement' },
            { type: 'SYMBOL', name: 'import_interface_statement' },
            { type: 'SYMBOL', name: 'print_statement' },
            { type: 'SYMBOL', name: 'expression_statement' },
            { type: 'SYMBOL', name: 'constant_definition' },
            { type: 'SYMBOL', name: 'immutable_definition' },
            { type: 'SYMBOL', name: 'implements_statement' },
            { type: 'SYMBOL', name: 'implements_multiple_statement' }
        ]
    });
    
    // Update _compound_statement to include interface definition if not already included
    modifyRule(grammar, '_compound_statement', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'if_statement' },
            { type: 'SYMBOL', name: 'for_statement' },
            { type: 'SYMBOL', name: 'while_statement' },
            { type: 'SYMBOL', name: 'function_definition' },
            { type: 'SYMBOL', name: 'contract_definition' },
            { type: 'SYMBOL', name: 'event_definition' },
            { type: 'SYMBOL', name: 'struct_definition' },
            { type: 'SYMBOL', name: 'interface_definition' },
            { type: 'SYMBOL', name: 'enum_definition' }
        ]
    });
    
    return grammar;
};
