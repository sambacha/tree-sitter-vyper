// modules/04_add_vyper_types.js
//const { addRule, modifyRule } = require('./utils');

module.exports = function (grammar, utils) {
    const {addRule, removeRule} = utils;
    //Remove type from python
    removeRule(grammar, 'type');

    addRule(grammar, 'type', {
        type: 'CHOICE',
        members: [
          { type: 'STRING', value: 'uint256' },
          { type: 'STRING', value: 'address' },
          { type: 'STRING', value: 'bool' },
          // Add other Vyper types here
        ]
      });

    return grammar;
};