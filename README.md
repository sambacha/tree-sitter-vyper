# Vyper Grammar Transformation from Python



## High-Level Workflow

The transformation process follows these steps:

1.  **Initialization:**  The process begins with the Tree-sitter grammar for Python (`input_file_0.js`).
2.  **Modular Transformation:**  A series of JavaScript modules, located in the `modules/` directory, are applied sequentially.  Each module performs a specific set of transformations on the grammar.  This modularity allows for:
    *   **Incremental Development:**  Changes can be made and tested in isolation.
    *   **Maintainability:**  The codebase is easier to understand and modify.
    *   **Testability:**  Each module can be tested independently.
3.  **Transformation Script (`transform.js`):** This script orchestrates the entire process.  It:
    *   Imports the initial Python grammar.
    *   Sequentially requires and executes each transformation module.
    *   Passes the (potentially modified) grammar to each subsequent module.
    *   Outputs the final, transformed grammar as `grammar.js`.
4.  **Utility Functions (`modules/utils.js`):**  This module provides core functions for manipulating the grammar (e.g., `removeRule`, `addRule`, `modifyRule`, `renameRule`). These functions include robust error handling and assertions to ensure the integrity of the grammar throughout the transformation.
5.  **Testing:** After each module is applied, and especially after the entire transformation, the generated `grammar.js` is tested using `tree-sitter parse` against a suite of Vyper code snippets (`test_suite/`).  This iterative testing is crucial for identifying and correcting errors.
6. **Coverage:** The `test_coverage.sh` script runs the generated parser against a test suite of Vyper code and reports which grammar rules are used. This helps identify gaps in the grammar.
7. **Statistics:** The `transform.js` script tracks and reports statistics about the transformation process, such as the number of rules added, removed, modified, and renamed.

The following diagram illustrates the workflow:

```mermaid
graph TD
    A[Python Grammar (input_file_0.js)] --> B(transform.js);
    B --> C[Module 01: Remove Features];
    C --> D[Module 02: Modify Imports];
    D --> E[Module 03: Modify Functions];
    E --> F[Module 04: Add Vyper Types];
    F --> G[Module 05: Add Decorators];
    G --> H[Module 06: Add Contract];
    H --> I[Module 07: Add Builtins];
    I --> J[Vyper Grammar (grammar.js)];
    J --> K[Test Suite (test_suite/*.vy)];
    K --> L[tree-sitter parse];
    L --> M{Coverage Report};
    style A fill:#ccf,stroke:#333,stroke-width:2px
    style J fill:#ccf,stroke:#333,stroke-width:2px
    style K fill:#fcf,stroke:#333,stroke-width:1px
    style M fill:#ffc,stroke:#333,stroke-width:1px
```


## Key Differences Between Python and Vyper Grammar

Vyper is designed for security and simplicity on the Ethereum Virtual Machine (EVM).  This leads to significant differences compared to Python.  These differences are addressed in the transformation process.

### A. Removed Python Features

| Feature                      | Reason for Removal                                   | Handling in Transformation                                                                |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Classes                      | Security, simplicity                                 | `class_definition`, `decorated_definition`, `decorator` rules removed.                   |
| Complex Imports            | Security, simplicity                                 | `future_import_statement`, `import_from_statement`, etc., removed; `import_statement` simplified. |
| Exceptions                   | Security, simplicity                                 | `try_statement`, `except_clause`, `finally_clause`, `raise_statement` rules removed.      |
| Generators/Yield             | Security, simplicity                                 | `yield`, `generator_expression` rules removed.                                           |
| Metaprogramming              | Security                                             | `exec_statement` rule removed.                                                           |
| Nonlocal/Global              | Security, simplicity                                 | `global_statement`, `nonlocal_statement` rules removed.                                  |
| Async/Await                  | Not supported on EVM                                 | `async`, `await` related rules and keywords removed.                                      |
| List/Dict/Set Comprehensions | Security, simplicity                                 | `list_comprehension`, `dictionary_comprehension`, `set_comprehension` rules removed.     |
| Certain Operators            | Not needed/supported                                  | Operators like `@` (matrix multiplication) are implicitly removed.                         |
| Print Statement (complex)   | Vyper's `print` is a built-in function.                | `print_statement` rule simplified to an identifier.                                       |
| Complex Slicing            | Limited slicing in Vyper                               | (Future) `slice` rule will be modified.                                                 |
| Match Statement              | Not supported                                          | Rules related to `match` and `case` removed                                             |
| Type Alias Statement        | Not supported                                          | Rule removed                                                                             |

### B. Modified Python Features

| Feature             | Modification                                                                                                | Handling in Transformation                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Function Definitions | Vyper has different decorators and type annotations.                                                          | `function_definition`, `parameters`, `typed_parameter`, etc., modified to accommodate Vyper syntax.                                                |
| Assignments         | Stricter type checking in Vyper.                                                                              | (Future) `assignment`, `augmented_assignment` rules will be modified.                                                                                 |
| Tuples/Lists       | Vyper uses these with type restrictions.                                                                       | (Future) Rules are modified                                                                           |
| Strings             | Specific string handling (e.g., `bytes32`).                                                                   | (Future) `string`, `concatenated_string` rules will be modified.                                                                                       |
| Integer/Float       | Specific integer types (e.g., `uint256`).                                                                     | `integer`, `float` rules are modified/replaced to support Vyper's numeric types.                                                                      |
| Dictionaries, sets  | Vyper uses HashMaps and does not have sets. | Rules are removed. |
| Comparison, Boolean, Unary, Binary, Lambda and Conditional Expressions | Vyper does not use the same structure. | Rules are removed. |

### C. Added Vyper Features

| Feature                 | Description                                                                                                | Handling in Transformation                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Decorators              | `@payable`, `@view`, `@pure`, `@external`, `@internal`, `@nonreentrant`                                    | `vyper_decorator` rule added, and integrated into `function_definition`.                                                   |
| Type Annotations       | `uint256`, `address`, `bool`, `bytes32`, `decimal`, structs, mappings, fixed-size arrays                      | `type`, `primitive_type`, `mapping_type`, `array_type`, `struct_type` rules added/modified.                               |
| Events                  | (Future) Event definitions.                                                                                 | (Future) Rules for `event` definitions will be added.                                                                       |
| Structs                 | (Future) Struct definitions.                                                                                | (Future) Rules for `struct` definitions will be added.                                                                      |
| Interfaces              | (Future) Interface definitions.                                                                              | (Future) Rules for `interface` definitions will be added.                                                                 |
| Built-in Functions     | `selfdestruct`, `send`, `raw_call`, etc.                                                                      | (Future) `builtin_function_or_method` rule added; specific built-ins will be added as identifiers.                          |
| Global Variables        | `msg.sender`, `block.timestamp`, etc.                                                                       | (Future) `builtin_variable` rule added; specific global variables will be added as identifiers.                            |
| Mappings                | Key-value store type.                                                                                      | `mapping_type` rule added.                                                                                               |
| Fixed-Size Arrays       | Arrays with a compile-time fixed size.                                                                        | `array_type` rule added.                                                                                                 |
| `self` Keyword        | Reference to the current contract.                                                                           | `self` added as a `primary_expression`.                                                                                     |
| Contract Definition    | Replaces Python's `class` keyword.                                                                             | `contract_definition` replaces Python `class_definition`.                                                              |
