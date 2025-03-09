// modules/05_add_decorators.js
const { addRule, modifyRule } = require('./utils');

module.exports = function (grammar, utils) {
    const {addRule, modifyRule} = utils;

    addRule(grammar, 'vyper_decorator', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: '@' },
            { type: 'FIELD', name: 'name', content: {type: 'SYMBOL', name: 'decorator_name'} },
        ]
      });

    addRule(grammar, 'decorator_name', {
        type: 'CHOICE',
        members:[
            {type: 'STRING', value: 'external'},
            {type: 'STRING', value: 'internal'},
            {type: 'STRING', value: 'view'},
            {type: 'STRING', value: 'pure'},
            {type: 'STRING', value: 'payable'},
            {type: 'STRING', value: 'nonreentrant'},
        ]
    });

    // Add state mutability decorators as valid expressions (for use in function definitions).
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
            { type: 'STRING', value: 'self'},
            { type: 'SYMBOL', name: 'decorator_name' }, // Add decorator names here
        ]
    });

      //Update supertypes
    grammar.supertypes.push(
        {
            type: 'SYMBOL',
            name: 'vyper_decorator'
        }
    );

    //Update externals
    grammar.externals.push(
        {type: 'STRING', value: 'nonreentrant'}
    );

    return grammar;
};
