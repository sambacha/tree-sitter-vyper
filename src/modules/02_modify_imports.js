// modules/02_modify_imports.js
//const { modifyRule } = require('./utils');

module.exports = function (grammar, utils) {
    const { modifyRule } = utils;
    modifyRule(grammar, 'import_statement', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'import' },
            { type: 'FIELD', name: 'name', content: {type: 'SYMBOL', name: 'dotted_name'} },
        ],
    });

      //Modify print statement to simply be an identifier (builtin function)
    modifyRule(grammar, 'print_statement', {
        type: 'SYMBOL', name: 'identifier'
    });

    return grammar;
};