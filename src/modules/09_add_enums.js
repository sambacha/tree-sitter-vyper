// modules/09_add_enums.js

module.exports = function (grammar, utils) {
    const {addRule, modifyRule} = utils;
    
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
                content: { type: 'SYMBOL', name: '_enum_body' } 
            }
        ]
    });
    
    // Add enum body
    addRule(grammar, '_enum_body', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: '\n' },
            { type: 'SYMBOL', name: '_indent' },
            { 
                type: 'REPEAT1',
                content: { type: 'SYMBOL', name: 'enum_member' }
            },
            { type: 'SYMBOL', name: '_dedent' }
        ]
    });
    
    // Add enum member
    addRule(grammar, 'enum_member', {
        type: 'SEQ',
        members: [
            { 
                type: 'FIELD', 
                name: 'name', 
                content: { type: 'SYMBOL', name: 'identifier' } 
            },
            { type: 'STRING', value: '\n' }
        ]
    });
    
    // Add enum type to the type rule
    modifyRule(grammar, 'type', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'primitive_type' },
            { type: 'SYMBOL', name: 'mapping_type' },
            { type: 'SYMBOL', name: 'array_type' },
            { type: 'SYMBOL', name: 'struct_type' },
            { type: 'SYMBOL', name: 'tuple_type' },
            { type: 'SYMBOL', name: 'contract_type_reference' },
            { type: 'SYMBOL', name: 'enum_type' }, // Add enum type
        ]
    });
    
    // Add enum type reference
    addRule(grammar, 'enum_type', {
        type: 'SYMBOL', name: 'identifier' // Enum type is just an identifier
    });
    
    // Update _compound_statement to include enum definition if not already included
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
