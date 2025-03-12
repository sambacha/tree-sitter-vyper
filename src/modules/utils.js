// modules/utils.js
//const assert = require('assert');

// Helper function to get rules regardless of grammar structure
function getRules(grammar) {
    if (grammar.rules) return grammar.rules;
    if (grammar.definition && grammar.definition.rules) return grammar.definition.rules;
    // Initialize empty rules object if none exists
    grammar.rules = {};
    return grammar.rules;
}

function removeRule(grammar, ruleName) {
    const rules = getRules(grammar);
    const originalRuleCount = Object.keys(rules).length;
    delete rules[ruleName];

    // Recursively remove references to the rule
    function removeReferences(obj) {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'object' && obj[i] !== null) {
                    if (obj[i].name === ruleName) {
                        obj.splice(i, 1);
                        i--; // Adjust index after removal
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

    for (const ruleKey in rules) {
        removeReferences(rules[ruleKey]);
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
    const rules = getRules(grammar);
    rules[ruleName] = newRule;
}

function addRule(grammar, ruleName, rule) {
    const rules = getRules(grammar);
    rules[ruleName] = rule;
}

function renameRule(grammar, oldName, newName) {
    const rules = getRules(grammar);
    rules[newName] = rules[oldName];
    delete rules[oldName];

    // Recursively rename references to the rule
    function renameReferences(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          if (typeof item === 'object' && item !== null) {
            if (item.name === oldName) {
              item.name = newName;
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

    for (const ruleKey in rules) {
        renameReferences(rules[ruleKey]);
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
        grammar.externals.forEach(external => {if (external.name === oldName) external.name = newName;});
    }
}

module.exports = { removeRule, modifyRule, addRule, renameRule };
