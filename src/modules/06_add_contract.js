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

  return grammar;
};
