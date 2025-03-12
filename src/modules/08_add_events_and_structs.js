// modules/08_add_events_and_structs.js

module.exports = function (grammar, utils) {
    const {addRule, modifyRule} = utils;
    
    // Add event definition
    addRule(grammar, 'event_definition', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'event' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'parameters', 
                content: { type: 'SYMBOL', name: 'event_parameters' } 
            }
        ]
    });
    
    addRule(grammar, 'event_parameters', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: '(' },
            { 
                type: 'OPTIONAL', 
                content: { type: 'SYMBOL', name: '_event_parameters' } 
            },
            { type: 'STRING', value: ')' }
        ]
    });
    
    addRule(grammar, '_event_parameters', {
        type: 'SEQ',
        members: [
            { type: 'SYMBOL', name: 'event_parameter' },
            { 
                type: 'REPEAT',
                content: {
                    type: 'SEQ',
                    members: [
                        { type: 'STRING', value: ',' },
                        { type: 'SYMBOL', name: 'event_parameter' }
                    ]
                }
            },
            { 
                type: 'OPTIONAL', 
                content: { type: 'STRING', value: ',' } 
            }
        ]
    });
    
    addRule(grammar, 'event_parameter', {
        type: 'SEQ',
        members: [
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'type', 
                content: { type: 'SYMBOL', name: 'type' } 
            },
            { 
                type: 'OPTIONAL',
                content: {
                    type: 'FIELD',
                    name: 'indexed',
                    content: { type: 'STRING', value: 'indexed' }
                }
            }
        ]
    });
    
    // Add struct definition
    addRule(grammar, 'struct_definition', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'struct' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'body', 
                content: { type: 'SYMBOL', name: '_suite' } 
            }
        ]
    });
    
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
                content: { type: 'SYMBOL', name: '_suite' } 
            }
        ]
    });
    
    // Add constant variable definition
    addRule(grammar, 'constant_definition', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'constant' },
            { 
                type: 'FIELD', 
                name: 'type', 
                content: { type: 'SYMBOL', name: 'type' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: '=' },
            { 
                type: 'FIELD', 
                name: 'value', 
                content: { type: 'SYMBOL', name: 'expression' } 
            }
        ]
    });
    
    // Add immutable variable definition
    addRule(grammar, 'immutable_definition', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'immutable' },
            { 
                type: 'FIELD', 
                name: 'type', 
                content: { type: 'SYMBOL', name: 'type' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            }
        ]
    });
    
    // Add enum definition
    addRule(grammar, 'enum_definition', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'enum' },
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: ':' },
            { 
                type: 'FIELD', 
                name: 'body', 
                content: { type: 'SYMBOL', name: '_suite' } 
            }
        ]
    });
    
    // Update _compound_statement to include new definitions
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
    
    // Update _simple_statement to include constant and immutable definitions
    modifyRule(grammar, '_simple_statement', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'import_statement' },
            { type: 'SYMBOL', name: 'import_from_statement' },
            { type: 'SYMBOL', name: 'print_statement' },
            { type: 'SYMBOL', name: 'expression_statement' },
            { type: 'SYMBOL', name: 'constant_definition' },
            { type: 'SYMBOL', name: 'immutable_definition' }
        ]
    });
    
    return grammar;
};
