// modules/05_add_decorators.js
//const { addRule } = require('./utils');

module.exports = function (grammar, utils) {
    const {addRule} = utils;
    addRule(grammar, 'vyper_decorator', {
        type: 'SEQ',
        members: [
            { type: 'STRING', value: '@' },
            { type: 'FIELD', name: 'name', content: {type: 'SYMBOL', name: 'identifier'} },
        ]
      });
      //Update supertypes
    grammar.supertypes.push(
        {
            type: 'SYMBOL',
            name: 'vyper_decorator'
        }
    );
    return grammar;
};