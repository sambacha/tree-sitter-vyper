// modules/02_modify_imports.js

module.exports = function (grammar, utils) {
    const { addRule } = utils;
    
    // Add custom import statement rule
    addRule(grammar, 'custom_import_statement', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: 'import' },
            { type: 'FIELD', name: 'name', content: {type: 'SYMBOL', name: 'dotted_name'} },
        ],
    });

    // Add custom print statement rule that treats print as an identifier
    addRule(grammar, 'custom_print_statement', {
        type: 'SYMBOL', 
        name: 'identifier'
    });

    // Add the new rules to the statement choices
    if (grammar.rules.statement && grammar.rules.statement.type === 'CHOICE') {
        grammar.rules.statement.members.push(
            { type: 'SYMBOL', name: 'custom_import_statement' },
            { type: 'SYMBOL', name: 'custom_print_statement' }
        );
    }

    return grammar;
};