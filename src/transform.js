// transform.js

const pythonGrammar = require('./input_file_0.js');
const fs = require('fs');

let stats = {
    rulesAdded: 0,
    rulesRemoved: 0,
    rulesModified: 0,
    rulesRenamed: 0,
    initialRuleCount: Object.keys(pythonGrammar.rules).length,
    finalRuleCount: 0,
};

// Wrap the utility functions to track statistics
const { removeRule, modifyRule, addRule, renameRule } = require('./modules/utils');
const wrappedUtils = {
    removeRule: (grammar, ruleName) => {
        removeRule(grammar, ruleName);
        stats.rulesRemoved++;
    },
    modifyRule: (grammar, ruleName, newRule) => {
        modifyRule(grammar, ruleName, newRule);
        stats.rulesModified++;
    },
    addRule: (grammar, ruleName, rule) => {
        addRule(grammar, ruleName, rule);
        stats.rulesAdded++;
    },
    renameRule: (grammar, oldName, newName) => {
        renameRule(grammar, oldName, newName);
        stats.rulesRenamed++;
    },
};


// Sequentially apply transformation modules
let vyperGrammar = pythonGrammar;
vyperGrammar = require('./modules/01_remove_features')(vyperGrammar, wrappedUtils);
vyperGrammar = require('./modules/02_modify_imports')(vyperGrammar, wrappedUtils);
vyperGrammar = require('./modules/03_modify_functions')(vyperGrammar, wrappedUtils);
vyperGrammar = require('./modules/04_add_vyper_types')(vyperGrammar, wrappedUtils);
vyperGrammar = require('./modules/05_add_decorators')(vyperGrammar, wrappedUtils);
vyperGrammar = require('./modules/06_add_contract')(vyperGrammar, wrappedUtils);
vyperGrammar = require('./modules/07_add_builtins')(vyperGrammar, wrappedUtils);

stats.finalRuleCount = Object.keys(vyperGrammar.rules).length;

// Output the grammar
fs.writeFileSync('./grammar.js', `module.exports = ${JSON.stringify(vyperGrammar, null, 2)};`, 'utf8');

// Output statistics
console.log("\nTransformation Statistics:");
console.log(`  Rules Added: ${stats.rulesAdded}`);
console.log(`  Rules Removed: ${stats.rulesRemoved}`);
console.log(`  Rules Modified: ${stats.rulesModified}`);
console.log(`  Rules Renamed: ${stats.rulesRenamed}`);
console.log(`  Initial Rule Count: ${stats.initialRuleCount}`);
console.log(`  Final Rule Count: ${stats.finalRuleCount}`);
console.log(`  Net Rule Change: ${stats.finalRuleCount - stats.initialRuleCount}`);