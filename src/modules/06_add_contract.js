// modules/06_add_contract.js
//const { addRule, renameRule, modifyRule } = require('./utils');

module.exports = function (grammar, utils) {
    const {addRule, renameRule} = utils;
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

  //Rename class definition to contract definition
    renameRule(grammar, 'class_definition', 'contract_definition');

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