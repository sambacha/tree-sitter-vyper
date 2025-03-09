// modules/04_add_vyper_types.js
const { addRule, removeRule, modifyRule } = require('./utils');

module.exports = function (grammar, utils) {
    const {addRule, removeRule, modifyRule} = utils;
    // Remove the original 'type' rule from Python
    removeRule(grammar, 'type');

    // Add a new 'type' rule for Vyper, including basic and complex types
    addRule(grammar, 'type', {
        type: 'CHOICE',
        members: [
            { type: 'SYMBOL', name: 'primitive_type' },
            { type: 'SYMBOL', name: 'mapping_type' },
            { type: 'SYMBOL', name: 'array_type' },
            { type: 'SYMBOL', name: 'struct_type' },  // For struct usage (not definition)
            { type: 'SYMBOL', name: 'tuple_type' }, //Vyper supports fixed size tuples.
            { type: 'SYMBOL', name: 'contract_type_reference'}, // Reference to other contracts
             // Future: Add function types, contract types, etc.
        ]
    });

    addRule(grammar, 'primitive_type', {
        type: 'CHOICE',
        members: [
            { type: 'STRING', value: 'uint8' },
            { type: 'STRING', value: 'uint16' },
            { type: 'STRING', value: 'uint32' },
            { type: 'STRING', value: 'uint64' },
            { type: 'STRING', value: 'uint128' },
            { type: 'STRING', value: 'uint256' },
            { type: 'STRING', value: 'int8' },
            { type: 'STRING', value: 'int16' },
            { type: 'STRING', value: 'int32' },
            { type: 'STRING', value: 'int64' },
            { type: 'STRING', value: 'int128' },
            { type: 'STRING', value: 'int256' },
            { type: 'STRING', value: 'bool' },
            { type: 'STRING', value: 'address' },
            { type: 'STRING', value: 'bytes32' },
            { type: 'STRING', value: 'decimal' },
            { type: 'STRING', value: 'bytes' }, //Dynamic bytes
            { type: 'STRING', value: 'string' },
            // Add other primitive types as needed
        ]
    });
    addRule(grammar, 'fixed_size_bytes', { //bytes1, bytes2, ..., bytes32
        type: 'SEQ',
        members:[
            {type: 'STRING', value: 'bytes'},
            {type: 'SYMBOL', name: 'integer'}
        ]
    });

    addRule(grammar, 'mapping_type', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'HashMap' },
            { type: 'STRING', value: '[' },
            { type: 'FIELD', name: 'key_type', content: { type: 'SYMBOL', name: 'type' } },
            { type: 'STRING', value: ',' },
            { type: 'FIELD', name: 'value_type', content: { type: 'SYMBOL', name: 'type' } },
            { type: 'STRING', value: ']' },
        ]
    });

    addRule(grammar, 'array_type', {
        type: 'SEQ',
        members: [
            { type: 'FIELD', name: 'base_type', content: { type: 'SYMBOL', name: 'type' } },
            { type: 'STRING', value: '[' },
            { type: 'FIELD', name: 'size', content: { type: 'CHOICE', members:[
                {type: 'SYMBOL', name: 'integer'},
                {type: 'SYMBOL', name: 'identifier'} //for constants
            ] } },
            { type: 'STRING', value: ']' },
        ]
    });
     // Rule to *use* a struct (not define it; struct definition is handled elsewhere)
    addRule(grammar, 'struct_type', {
      type: 'SYMBOL', name: 'identifier' //Struct type is just an identifier
    });

    addRule(grammar, 'tuple_type', {
        type: 'SEQ',
        members:[
            {type: 'STRING', value: '('},
            {
                type: 'FIELD',
                name: 'members',
                content: {
                    type: 'SEQ',
                    members: [
                        { type: 'SYMBOL', name: 'type'},
                        {
                            type: 'REPEAT',
                            content: {
                                type: 'SEQ',
                                members:[
                                    {type: 'STRING', value: ','},
                                    { type: 'SYMBOL', name: 'type'}
                                ]
                            }
                        },
                        {
                            type: 'OPTIONAL',
                            content: {type: 'STRING', value: ','}
                        }
                    ]
                }
            },
            {type: 'STRING', value: ')'},
        ]
    });

    // Add a way to reference other contract types
    addRule(grammar, 'contract_type_reference', {
        type: 'SYMBOL', name: 'identifier'  // Similar to struct_type, it's just an identifier
    });

    //Update externals
    grammar.externals.push(
        { type: 'STRING', value: 'uint8' },
        { type: 'STRING', value: 'uint16' },
        { type: 'STRING', value: 'uint32' },
        { type: 'STRING', value: 'uint64' },
        { type: 'STRING', value: 'uint128' },
        { type: 'STRING', value: 'int8' },
        { type: 'STRING', value: 'int16' },
        { type: 'STRING', value: 'int32' },
        { type: 'STRING', value: 'int64' },
        { type: 'STRING', value: 'int128' },
        { type: 'STRING', value: 'bytes' },
        { type: 'STRING', value: 'string' },
    );

    return grammar;
};
