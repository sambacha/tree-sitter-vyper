// modules/utils.js
const assert = require('assert');

function removeRule(grammar, ruleName) {
    assert(grammar.rules.hasOwnProperty(ruleName), `Rule "${ruleName}" not found in grammar.`);

    const originalRuleCount = Object.keys(grammar.rules).length;
    delete grammar.rules[ruleName];
    assert(Object.keys(grammar.rules).length === originalRuleCount - 1, `Rule "${ruleName}" not deleted.`);

    // Recursively remove references to the rule
    function removeReferences(obj) {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'object' && obj[i] !== null) {
                    if (obj[i].name === ruleName) {
                        obj.splice(i, 1);
                        i--; // Adjust index after removal
                        assert(obj[i]?.name !== ruleName, `Failed to remove reference to ${ruleName}`); //Check removal

                    } else {
                        removeReferences(obj[i]);
                    }
                }
            }
        } else if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        if (obj[key].name === ruleName) {
                            delete obj[key];
                        } else {
                            removeReferences(obj[key]);
                        }
                    }
                }
            }
        }
    }

    for (const ruleKey in grammar.rules) {
        removeReferences(grammar.rules[ruleKey]);
    }
     // Remove from supertypes
    if (grammar.supertypes) {
      grammar.supertypes = grammar.supertypes.filter(type => type.name !== ruleName);
    }
    // Remove from conflicts
    if (grammar.conflicts) {
      grammar.conflicts = grammar.conflicts.filter(conflict =>
        !conflict.some(member => member.name === ruleName)
      );
    }
    // Remove from externals
    if (grammar.externals) {
        grammar.externals = grammar.externals.filter(external => external.name !== ruleName );
    }
}

function modifyRule(grammar, ruleName, newRule) {
    assert(grammar.rules.hasOwnProperty(ruleName), `Rule "${ruleName}" not found in grammar.`);
    assert(typeof newRule === 'object' && newRule !== null, "New rule must be a valid object.");

    grammar.rules[ruleName] = newRule;
    assert.deepStrictEqual(grammar.rules[ruleName], newRule, `Rule "${ruleName}" not modified correctly.`);
}

function addRule(grammar, ruleName, rule) {
    assert(!grammar.rules.hasOwnProperty(ruleName), `Rule "${ruleName}" already exists in grammar.`);
    assert(typeof rule === 'object' && rule !== null, "New rule must be a valid object.");

    grammar.rules[ruleName] = rule;
    assert.deepStrictEqual(grammar.rules[ruleName], rule, `Rule "${ruleName}" not added correctly.`);
}

function renameRule(grammar, oldName, newName) {
    assert(grammar.rules.hasOwnProperty(oldName), `Rule "${oldName}" not found in grammar.`);
    assert(!grammar.rules.hasOwnProperty(newName), `Rule "${newName}" already exists.`);

    grammar.rules[newName] = grammar.rules[oldName];
    delete grammar.rules[oldName];
    assert(!grammar.rules.hasOwnProperty(oldName), `Original Rule "${oldName}" not deleted.`);
    assert(grammar.rules.hasOwnProperty(newName), `New Rule "${newName}" not created.`);

    // Recursively rename references to the rule
    function renameReferences(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          if (typeof item === 'object' && item !== null) {
            if (item.name === oldName) {
              item.name = newName;
              assert(item.name === newName, `Failed to rename ${oldName} to ${newName}`);
            }
            renameReferences(item);
          }
        }
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              if (obj[key].name === oldName) {
                obj[key].name = newName;
              }
              renameReferences(obj[key]);
            }
          }
        }
      }
    }

    for (const ruleKey in grammar.rules) {
        renameReferences(grammar.rules[ruleKey]);
    }

    // Rename in supertypes
    if (grammar.supertypes) {
      grammar.supertypes.forEach(type => { if (type.name === oldName) type.name = newName; });
    }

    // Rename in conflicts
    if (grammar.conflicts) {
      grammar.conflicts.forEach(conflict => {
        conflict.forEach(member => { if (member.name === oldName) member.name = newName; });
      });
    }
    // Rename in externals
    if (grammar.externals) {
        grammar.externals.forEach( external => {if (external.name === oldName) external.name = newName;} );
    }
}

module.exports = { removeRule, modifyRule, addRule, renameRule };
