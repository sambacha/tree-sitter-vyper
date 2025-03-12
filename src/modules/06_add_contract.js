// modules/06_add_contract.js
//const { addRule, modifyRule } = require('./utils');

module.exports = function (grammar, utils) {
    const {addRule} = utils;
      addRule(grammar, 'contract_definition', {
        type: 'SEQ',
        members:[
            {
                type: 'STRING',
                value: 'contract'
            },
            {
                type: 'FIELD',
                name: 'name',
                content: {
                    type: 'SYMBOL',
                    name: 'identifier'
                }
            },
            {
                type: 'STRING',
                value: ':'
            },
            {
                type: 'FIELD',
                name: 'body',
                content: {
                    type: 'SYMBOL',
                    name: '_suite'
                }
            }
        ]
    });

  // Note: class_definition is already removed in 01_remove_features.js
  // so we don't need to rename it

    //Update conflicts
    grammar.conflicts.push([
        {
            type: 'SYMBOL',
            name: 'function_definition'
        },
        {
            type: 'SYMBOL',
            name: 'expression_statement'
        }
    ]);
  return grammar;
};
