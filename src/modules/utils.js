// modules/utils.js
const assert = require('assert');

function removeRule(grammar, ruleName) {
    assert(grammar.rules.hasOwnProperty(ruleName), `Rule "${ruleName}" not found in grammar.`);

    const originalRuleCount = Object.keys(grammar.rules).length;
    delete grammar.rules[ruleName];
    assert(Object.keys(grammar.rules).length === originalRuleCount - 1, `Rule "${ruleName}" not deleted.`);

    // ... (rest of the removeReferences function remains the same) ...
    // ... (inside removeReferences) ...
        if (obj[i].name === ruleName) {
            obj.splice(i, 1);
            i--;
            assert(obj[i]?.name !== ruleName, `Failed to remove reference to ${ruleName}`); //Check removal
        }
     // ... (rest of the removeReferences function remains the same) ...
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

    // ... (rest of the renameReferences function remains the same) ...
    // ... (inside renameReferences) ...
        if (item.name === oldName) {
            item.name = newName;
            assert(item.name === newName, `Failed to rename ${oldName} to ${newName}`);
        }
    // ... (rest of the renameReferences function remains the same) ...
}

module.exports = { removeRule, modifyRule, addRule, renameRule };