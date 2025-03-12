// Example of using the tree-sitter-vyper grammar in a Node.js application

const fs = require('fs');
const path = require('path');
const Parser = require('tree-sitter');
const Vyper = require('../vyper_grammar.js');

// Initialize the parser
const parser = new Parser();
parser.setLanguage(Vyper);

// Function to parse a Vyper file and print the AST
function parseVyperFile(filePath) {
    console.log(`Parsing file: ${filePath}`);
    
    try {
        // Read the file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Parse the content
        const tree = parser.parse(fileContent);
        
        // Print the AST
        console.log('Abstract Syntax Tree:');
        console.log(tree.rootNode.toString());
        
        // Example: Find all function definitions
        console.log('\nFunction Definitions:');
        const functionCursor = tree.rootNode.walk();
        const functions = [];
        
        const visitFunctions = () => {
            if (functionCursor.nodeType === 'function_definition') {
                // Find the function name
                let functionName = null;
                for (const child of functionCursor.currentNode().children) {
                    if (child.type === 'identifier' && child.parent.fieldName === 'name') {
                        functionName = child.text;
                        break;
                    }
                }
                
                functions.push({
                    name: functionName,
                    line: functionCursor.currentNode().startPosition.row + 1,
                    column: functionCursor.currentNode().startPosition.column + 1
                });
            }
            
            if (functionCursor.gotoFirstChild()) {
                do {
                    visitFunctions();
                } while (functionCursor.gotoNextSibling());
                
                functionCursor.gotoParent();
            }
        };
        
        visitFunctions();
        
        // Print the functions
        functions.forEach(func => {
            console.log(`  - ${func.name} (Line ${func.line}, Column ${func.column})`);
        });
        
        // Example: Find all event definitions
        console.log('\nEvent Definitions:');
        const eventCursor = tree.rootNode.walk();
        const events = [];
        
        const visitEvents = () => {
            if (eventCursor.nodeType === 'event_definition') {
                // Find the event name
                let eventName = null;
                for (const child of eventCursor.currentNode().children) {
                    if (child.type === 'identifier' && child.parent.fieldName === 'name') {
                        eventName = child.text;
                        break;
                    }
                }
                
                events.push({
                    name: eventName,
                    line: eventCursor.currentNode().startPosition.row + 1,
                    column: eventCursor.currentNode().startPosition.column + 1
                });
            }
            
            if (eventCursor.gotoFirstChild()) {
                do {
                    visitEvents();
                } while (eventCursor.gotoNextSibling());
                
                eventCursor.gotoParent();
            }
        };
        
        visitEvents();
        
        // Print the events
        events.forEach(event => {
            console.log(`  - ${event.name} (Line ${event.line}, Column ${event.column})`);
        });
        
        return true;
    } catch (error) {
        console.error(`Error reading or parsing ${filePath}:`, error.message);
        return false;
    }
}

// Parse a sample Vyper file
const sampleFile = path.join(__dirname, 'erc20.vy');
parseVyperFile(sampleFile);
