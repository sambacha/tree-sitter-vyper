#!/bin/bash

# Build script for tree-sitter-vyper

echo "Building tree-sitter-vyper grammar..."

# Step 1: Run the transformation to generate the grammar.js file
echo "Running transformation..."
node src/transform.js

# Step 2: Generate the parser using tree-sitter
echo "Generating parser..."
npx tree-sitter generate

# Step 3: Run tests
echo "Running tests..."
node test/test_grammar.js

echo "Build complete!"
