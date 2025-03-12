# Tree-sitter-vyper

A [tree-sitter](https://github.com/tree-sitter/tree-sitter) grammar for the [Vyper](https://vyper.readthedocs.io/) smart contract language.

## Overview

This grammar is derived from the [tree-sitter-python](https://github.com/tree-sitter/tree-sitter-python) grammar, with modifications to support Vyper-specific syntax and features. Vyper is a contract-oriented, pythonic programming language that targets the Ethereum Virtual Machine (EVM).

## Features

The grammar supports the following Vyper language features:

- Contract definitions
- Function definitions with decorators (`@external`, `@internal`, `@view`, `@pure`, etc.)
- Vyper-specific types (uint256, address, bytes32, etc.)
- Events and event parameters
- Structs and enums
- Interfaces
- Constants and immutables
- Mappings and arrays
- Built-in functions and variables

## Implementation

The grammar is implemented as a series of transformations applied to the Python grammar:

1. **Remove Python features not supported in Vyper**
   - Classes (replaced with contracts)
   - Decorators (replaced with Vyper-specific decorators)
   - Generators and comprehensions
   - Exception handling (try/except/finally)
   - Async/await
   - Lambda functions
   - And many other Python features not supported in Vyper

2. **Add Vyper-specific features**
   - Contract syntax
   - Vyper types (uint256, address, etc.)
   - Function decorators (@external, @view, etc.)
   - Events and event parameters
   - Structs and enums
   - Interfaces
   - Constants and immutables
   - Built-in functions and variables

## Usage

### Installation

```bash
npm install tree-sitter-vyper
```

### Usage with Node.js

```javascript
const Parser = require('tree-sitter');
const Vyper = require('tree-sitter-vyper');

const parser = new Parser();
parser.setLanguage(Vyper);

const sourceCode = `
# @version ^0.3.7

contract MyContract:
    # State variable
    value: public(uint256)
    
    @external
    def __init__(_value: uint256):
        self.value = _value
        
    @external
    def set_value(_value: uint256):
        self.value = _value
`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
```

## Examples

See the `examples/` directory for sample Vyper contracts that demonstrate the language features supported by this grammar.

## Development

### Building the Grammar

```bash
npm install
npm run build
```

### Testing

```bash
npm test
```

## License

MIT
