/**
 * @file Vyper grammar for tree-sitter
 * @license MIT
 * @see {@link https://docs.vyperlang.org/en/stable/|Vyper Documentation}
 */

// This file exports the transformed Python grammar with Vyper-specific modifications
// The actual transformation is done in src/transform.js

// Import the transformed grammar
const vyperGrammar = require('./grammar.js');

// Export the Vyper grammar
module.exports = vyperGrammar;
