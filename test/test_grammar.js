// test_grammar.js
const fs = require('fs');
const path = require('path');
const Parser = require('tree-sitter');
const Vyper = require('../vyper_grammar.js');

// Initialize the parser
const parser = new Parser();
parser.setLanguage(Vyper);

// Function to test parsing a file
function testParseFile(filePath) {
    console.log(`Testing file: ${filePath}`);
    
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const tree = parser.parse(fileContent);
        
        // Check if there are any errors in the parse tree
        const hasErrors = checkForErrors(tree.rootNode);
        
        if (hasErrors) {
            console.error(`❌ Parsing failed for ${filePath}`);
            return false;
        } else {
            console.log(`✅ Successfully parsed ${filePath}`);
            return true;
        }
    } catch (error) {
        console.error(`❌ Error reading or parsing ${filePath}:`, error.message);
        return false;
    }
}

// Function to check for errors in the parse tree
function checkForErrors(node) {
    if (node.type === 'ERROR') {
        console.error(`Error at line ${node.startPosition.row + 1}, column ${node.startPosition.column + 1}`);
        return true;
    }
    
    for (const child of node.children) {
        if (checkForErrors(child)) {
            return true;
        }
    }
    
    return false;
}

// Get all example files
const examplesDir = path.join(__dirname, '..', 'examples');
const exampleFiles = fs.readdirSync(examplesDir)
    .filter(file => file.endsWith('.vy'))
    .map(file => path.join(examplesDir, file));

// Test each example file
let passCount = 0;
let failCount = 0;

console.log('Starting grammar tests...\n');

for (const file of exampleFiles) {
    const result = testParseFile(file);
    if (result) {
        passCount++;
    } else {
        failCount++;
    }
    console.log(''); // Add a blank line between tests
}

// Print summary
console.log('Test Summary:');
console.log(`  Total files tested: ${exampleFiles.length}`);
console.log(`  Passed: ${passCount}`);
console.log(`  Failed: ${failCount}`);

if (failCount === 0) {
    console.log('\n✅ All tests passed!');
    process.exit(0);
} else {
    console.log('\n❌ Some tests failed.');
    process.exit(1);
}
