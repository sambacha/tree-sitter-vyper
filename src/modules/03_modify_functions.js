// modules/03_modify_functions.js
const { modifyRule, addRule, removeRule } = require('./utils');

module.exports = function (grammar, utils) {
    modifyRule(grammar, 'function_definition', {
        type: 'SEQ',
        members:[
           {
               type: 'REPEAT',
               content: {
                   type: 'SYMBOL',
                   name: 'vyper_decorator'
               }
            },
           {
               type: 'STRING',
               value: 'def'
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
               type: 'FIELD',
               name: 'parameters',
               content: {
                   type: 'SYMBOL',
                   name: 'parameters'
               }
           },
           {
               type: 'OPTIONAL',
               content: {
                 type: 'SEQ',
                 members:[
                   {
                       type: 'STRING',
                       value: '->'
                     },
                     {
                       type: 'FIELD',
                       name: 'return_type',
                       content: {
                         type: 'SYMBOL',
                         name: 'type'
                       }
                     }
                 ]
               },
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

    //Remove the parameters and typed parameters, and recreate
    removeRule(grammar, 'parameters');
    removeRule(grammar, 'typed_parameter');
    removeRule(grammar, '_parameters');
    removeRule(grammar, 'lambda_parameters');


    addRule(grammar, 'parameters', {
        type: 'SEQ',
        members: [
          {
            type: 'STRING',
            value: '('
          },
          {
            type: 'OPTIONAL',
            content: {
              type: 'SYMBOL',
              name: '_parameters'
            }
          },
          {
            type: 'STRING',
            value: ')'
          }
        ]
      });
      addRule(grammar, '_parameters', {
        type: 'SEQ',
        members: [
          {
            type: 'SYMBOL',
            name: 'parameter'
          },
          {
            type: 'REPEAT',
            content: {
              type: 'SEQ',
              members: [
                {
                  type: 'STRING',
                  value: ','
                },
                {
                  type: 'SYMBOL',
                  name: 'parameter'
                }
              ]
            }
          },
          {
            type: 'OPTIONAL',
            content: {
              type: 'STRING',
              value: ','
            }
          }
        ]
      });
      addRule(grammar, 'parameter', {
        type: 'SEQ',
        members:[
            {
                type: 'FIELD',
                name: 'name',
                content: {type: 'SYMBOL', name: 'identifier'}
            },
            {
                type: 'STRING',
                value: ':'
            },
            {
                type: 'FIELD',
                name: 'type',
                content: {type: 'SYMBOL', name: 'type'}
            }
        ]
      });

    return grammar;
};
