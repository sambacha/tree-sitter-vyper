module.exports = {
  "rules": {
    "custom_import_statement": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "import"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "dotted_name"
          }
        }
      ]
    },
    "custom_print_statement": {
      "type": "SYMBOL",
      "name": "identifier"
    },
    "function_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "REPEAT",
          "content": {
            "type": "SYMBOL",
            "name": "vyper_decorator"
          }
        },
        {
          "type": "STRING",
          "value": "def"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "SEQ",
            "members": [
              {
                "type": "STRING",
                "value": "->"
              },
              {
                "type": "FIELD",
                "name": "return_type"
              }
            ]
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "body",
          "content": {
            "type": "SYMBOL",
            "name": "_suite"
          }
        }
      ]
    },
    "parameters": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "("
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "SYMBOL",
            "name": "_parameters"
          }
        },
        {
          "type": "STRING",
          "value": ")"
        }
      ]
    },
    "_parameters": {
      "type": "SEQ",
      "members": [
        {
          "type": "SYMBOL",
          "name": "parameter"
        },
        {
          "type": "REPEAT",
          "content": {
            "type": "SEQ",
            "members": [
              {
                "type": "STRING",
                "value": ","
              },
              {
                "type": "SYMBOL",
                "name": "parameter"
              }
            ]
          }
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "STRING",
            "value": ","
          }
        }
      ]
    },
    "parameter": {
      "type": "SEQ",
      "members": [
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        }
      ]
    },
    "type": {
      "type": "CHOICE",
      "members": [
        {
          "type": "SYMBOL",
          "name": "primitive_type"
        },
        {
          "type": "SYMBOL",
          "name": "mapping_type"
        },
        {
          "type": "SYMBOL",
          "name": "array_type"
        },
        {
          "type": "SYMBOL",
          "name": "struct_type"
        },
        {
          "type": "SYMBOL",
          "name": "tuple_type"
        },
        {
          "type": "SYMBOL",
          "name": "contract_type_reference"
        },
        {
          "type": "SYMBOL",
          "name": "enum_type"
        }
      ]
    },
    "primitive_type": {
      "type": "CHOICE",
      "members": [
        {
          "type": "STRING",
          "value": "uint8"
        },
        {
          "type": "STRING",
          "value": "uint16"
        },
        {
          "type": "STRING",
          "value": "uint32"
        },
        {
          "type": "STRING",
          "value": "uint64"
        },
        {
          "type": "STRING",
          "value": "uint128"
        },
        {
          "type": "STRING",
          "value": "uint256"
        },
        {
          "type": "STRING",
          "value": "int8"
        },
        {
          "type": "STRING",
          "value": "int16"
        },
        {
          "type": "STRING",
          "value": "int32"
        },
        {
          "type": "STRING",
          "value": "int64"
        },
        {
          "type": "STRING",
          "value": "int128"
        },
        {
          "type": "STRING",
          "value": "int256"
        },
        {
          "type": "STRING",
          "value": "bool"
        },
        {
          "type": "STRING",
          "value": "address"
        },
        {
          "type": "STRING",
          "value": "bytes32"
        },
        {
          "type": "STRING",
          "value": "decimal"
        },
        {
          "type": "STRING",
          "value": "bytes"
        },
        {
          "type": "STRING",
          "value": "string"
        }
      ]
    },
    "fixed_size_bytes": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "bytes"
        },
        {
          "type": "SYMBOL",
          "name": "integer"
        }
      ]
    },
    "mapping_type": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "HashMap"
        },
        {
          "type": "STRING",
          "value": "["
        },
        {
          "type": "FIELD",
          "name": "key_type",
          "content": {
            "type": "SYMBOL",
            "name": "type"
          }
        },
        {
          "type": "STRING",
          "value": ","
        },
        {
          "type": "FIELD",
          "name": "value_type",
          "content": {
            "type": "SYMBOL",
            "name": "type"
          }
        },
        {
          "type": "STRING",
          "value": "]"
        }
      ]
    },
    "array_type": {
      "type": "SEQ",
      "members": [
        {
          "type": "FIELD",
          "name": "base_type",
          "content": {
            "type": "SYMBOL",
            "name": "type"
          }
        },
        {
          "type": "STRING",
          "value": "["
        },
        {
          "type": "FIELD",
          "name": "size",
          "content": {
            "type": "CHOICE",
            "members": [
              {
                "type": "SYMBOL",
                "name": "integer"
              },
              {
                "type": "SYMBOL",
                "name": "identifier"
              }
            ]
          }
        },
        {
          "type": "STRING",
          "value": "]"
        }
      ]
    },
    "struct_type": {
      "type": "SYMBOL",
      "name": "identifier"
    },
    "tuple_type": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "("
        },
        {
          "type": "FIELD",
          "name": "members",
          "content": {
            "type": "SEQ",
            "members": [
              {
                "type": "SYMBOL",
                "name": "type"
              },
              {
                "type": "REPEAT",
                "content": {
                  "type": "SEQ",
                  "members": [
                    {
                      "type": "STRING",
                      "value": ","
                    },
                    {
                      "type": "SYMBOL",
                      "name": "type"
                    }
                  ]
                }
              },
              {
                "type": "OPTIONAL",
                "content": {
                  "type": "STRING",
                  "value": ","
                }
              }
            ]
          }
        },
        {
          "type": "STRING",
          "value": ")"
        }
      ]
    },
    "contract_type_reference": {
      "type": "SYMBOL",
      "name": "identifier"
    },
    "vyper_decorator": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "@"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "decorator_name"
          }
        }
      ]
    },
    "decorator_name": {
      "type": "CHOICE",
      "members": [
        {
          "type": "STRING",
          "value": "external"
        },
        {
          "type": "STRING",
          "value": "internal"
        },
        {
          "type": "STRING",
          "value": "view"
        },
        {
          "type": "STRING",
          "value": "pure"
        },
        {
          "type": "STRING",
          "value": "payable"
        },
        {
          "type": "STRING",
          "value": "nonreentrant"
        }
      ]
    },
    "primary_expression": {
      "type": "CHOICE",
      "members": [
        {
          "type": "SYMBOL",
          "name": "identifier"
        },
        {
          "type": "SYMBOL",
          "name": "string"
        },
        {
          "type": "SYMBOL",
          "name": "concatenated_string"
        },
        {
          "type": "SYMBOL",
          "name": "integer"
        },
        {
          "type": "SYMBOL",
          "name": "float"
        },
        {
          "type": "SYMBOL",
          "name": "numeric_literal_with_unit"
        },
        {
          "type": "SYMBOL",
          "name": "true"
        },
        {
          "type": "SYMBOL",
          "name": "false"
        },
        {
          "type": "SYMBOL",
          "name": "none"
        },
        {
          "type": "SYMBOL",
          "name": "parenthesized_expression"
        },
        {
          "type": "SYMBOL",
          "name": "ellipsis"
        },
        {
          "type": "SYMBOL",
          "name": "vyper_builtin"
        }
      ]
    },
    "contract_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "contract"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "body",
          "content": {
            "type": "SYMBOL",
            "name": "_suite"
          }
        }
      ]
    },
    "vyper_builtin": {
      "type": "CHOICE",
      "members": [
        {
          "type": "STRING",
          "value": "block.coinbase"
        },
        {
          "type": "STRING",
          "value": "block.difficulty"
        },
        {
          "type": "STRING",
          "value": "block.number"
        },
        {
          "type": "STRING",
          "value": "block.timestamp"
        },
        {
          "type": "STRING",
          "value": "block.gaslimit"
        },
        {
          "type": "STRING",
          "value": "block.chainid"
        },
        {
          "type": "STRING",
          "value": "block.basefee"
        },
        {
          "type": "STRING",
          "value": "block.prevhash"
        },
        {
          "type": "STRING",
          "value": "msg.sender"
        },
        {
          "type": "STRING",
          "value": "msg.value"
        },
        {
          "type": "STRING",
          "value": "msg.gas"
        },
        {
          "type": "STRING",
          "value": "tx.origin"
        },
        {
          "type": "STRING",
          "value": "tx.gasprice"
        },
        {
          "type": "STRING",
          "value": "chain.id"
        },
        {
          "type": "STRING",
          "value": "chain.network"
        },
        {
          "type": "STRING",
          "value": "assert"
        },
        {
          "type": "STRING",
          "value": "min"
        },
        {
          "type": "STRING",
          "value": "max"
        },
        {
          "type": "STRING",
          "value": "sha256"
        },
        {
          "type": "STRING",
          "value": "keccak256"
        },
        {
          "type": "STRING",
          "value": "ecrecover"
        },
        {
          "type": "STRING",
          "value": "ecadd"
        },
        {
          "type": "STRING",
          "value": "ecmul"
        },
        {
          "type": "STRING",
          "value": "extract32"
        },
        {
          "type": "STRING",
          "value": "as_wei_value"
        },
        {
          "type": "STRING",
          "value": "convert"
        },
        {
          "type": "STRING",
          "value": "selfdestruct"
        },
        {
          "type": "STRING",
          "value": "raw_call"
        },
        {
          "type": "STRING",
          "value": "create_forwarder_to"
        },
        {
          "type": "STRING",
          "value": "blockhash"
        },
        {
          "type": "STRING",
          "value": "method_id"
        },
        {
          "type": "STRING",
          "value": "floor"
        },
        {
          "type": "STRING",
          "value": "ceil"
        },
        {
          "type": "STRING",
          "value": "abs"
        },
        {
          "type": "STRING",
          "value": "sqrt"
        },
        {
          "type": "STRING",
          "value": "pow"
        },
        {
          "type": "STRING",
          "value": "exp"
        },
        {
          "type": "STRING",
          "value": "log"
        },
        {
          "type": "STRING",
          "value": "len"
        },
        {
          "type": "STRING",
          "value": "concat"
        },
        {
          "type": "STRING",
          "value": "slice"
        },
        {
          "type": "STRING",
          "value": "wei"
        },
        {
          "type": "STRING",
          "value": "gwei"
        },
        {
          "type": "STRING",
          "value": "ether"
        },
        {
          "type": "STRING",
          "value": "self"
        },
        {
          "type": "STRING",
          "value": "this"
        },
        {
          "type": "STRING",
          "value": "empty"
        },
        {
          "type": "STRING",
          "value": "ZERO_ADDRESS"
        },
        {
          "type": "STRING",
          "value": "MAX_UINT256"
        },
        {
          "type": "STRING",
          "value": "EMPTY_BYTES32"
        }
      ]
    },
    "unit_type": {
      "type": "CHOICE",
      "members": [
        {
          "type": "STRING",
          "value": "wei"
        },
        {
          "type": "STRING",
          "value": "gwei"
        },
        {
          "type": "STRING",
          "value": "ether"
        },
        {
          "type": "STRING",
          "value": "seconds"
        },
        {
          "type": "STRING",
          "value": "minutes"
        },
        {
          "type": "STRING",
          "value": "hours"
        },
        {
          "type": "STRING",
          "value": "days"
        },
        {
          "type": "STRING",
          "value": "weeks"
        }
      ]
    },
    "numeric_literal_with_unit": {
      "type": "SEQ",
      "members": [
        {
          "type": "CHOICE",
          "members": [
            {
              "type": "SYMBOL",
              "name": "integer"
            },
            {
              "type": "SYMBOL",
              "name": "float"
            }
          ]
        },
        {
          "type": "SYMBOL",
          "name": "unit_type"
        }
      ]
    },
    "event_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "event"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "parameters",
          "content": {
            "type": "SYMBOL",
            "name": "event_parameters"
          }
        }
      ]
    },
    "event_parameters": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "("
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "SYMBOL",
            "name": "_event_parameters"
          }
        },
        {
          "type": "STRING",
          "value": ")"
        }
      ]
    },
    "_event_parameters": {
      "type": "SEQ",
      "members": [
        {
          "type": "SYMBOL",
          "name": "event_parameter"
        },
        {
          "type": "REPEAT",
          "content": {
            "type": "SEQ",
            "members": [
              {
                "type": "STRING",
                "value": ","
              },
              {
                "type": "SYMBOL",
                "name": "event_parameter"
              }
            ]
          }
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "STRING",
            "value": ","
          }
        }
      ]
    },
    "event_parameter": {
      "type": "SEQ",
      "members": [
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "type",
          "content": {
            "type": "SYMBOL",
            "name": "type"
          }
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "FIELD",
            "name": "indexed",
            "content": {
              "type": "STRING",
              "value": "indexed"
            }
          }
        }
      ]
    },
    "struct_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "struct"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "body",
          "content": {
            "type": "SYMBOL",
            "name": "_suite"
          }
        }
      ]
    },
    "interface_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "interface"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "body",
          "content": {
            "type": "SYMBOL",
            "name": "_interface_body"
          }
        }
      ]
    },
    "constant_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "constant"
        },
        {
          "type": "FIELD",
          "name": "type",
          "content": {
            "type": "SYMBOL",
            "name": "type"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": "="
        },
        {
          "type": "FIELD",
          "name": "value",
          "content": {
            "type": "SYMBOL",
            "name": "expression"
          }
        }
      ]
    },
    "immutable_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "immutable"
        },
        {
          "type": "FIELD",
          "name": "type",
          "content": {
            "type": "SYMBOL",
            "name": "type"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        }
      ]
    },
    "enum_definition": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "enum"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "body",
          "content": {
            "type": "SYMBOL",
            "name": "_enum_body"
          }
        }
      ]
    },
    "_compound_statement": {
      "type": "CHOICE",
      "members": [
        {
          "type": "SYMBOL",
          "name": "if_statement"
        },
        {
          "type": "SYMBOL",
          "name": "for_statement"
        },
        {
          "type": "SYMBOL",
          "name": "while_statement"
        },
        {
          "type": "SYMBOL",
          "name": "function_definition"
        },
        {
          "type": "SYMBOL",
          "name": "contract_definition"
        },
        {
          "type": "SYMBOL",
          "name": "event_definition"
        },
        {
          "type": "SYMBOL",
          "name": "struct_definition"
        },
        {
          "type": "SYMBOL",
          "name": "interface_definition"
        },
        {
          "type": "SYMBOL",
          "name": "enum_definition"
        }
      ]
    },
    "_simple_statement": {
      "type": "CHOICE",
      "members": [
        {
          "type": "SYMBOL",
          "name": "import_statement"
        },
        {
          "type": "SYMBOL",
          "name": "import_from_statement"
        },
        {
          "type": "SYMBOL",
          "name": "import_interface_statement"
        },
        {
          "type": "SYMBOL",
          "name": "print_statement"
        },
        {
          "type": "SYMBOL",
          "name": "expression_statement"
        },
        {
          "type": "SYMBOL",
          "name": "constant_definition"
        },
        {
          "type": "SYMBOL",
          "name": "immutable_definition"
        },
        {
          "type": "SYMBOL",
          "name": "implements_statement"
        },
        {
          "type": "SYMBOL",
          "name": "implements_multiple_statement"
        }
      ]
    },
    "_enum_body": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "\n"
        },
        {
          "type": "SYMBOL",
          "name": "_indent"
        },
        {
          "type": "REPEAT1",
          "content": {
            "type": "SYMBOL",
            "name": "enum_member"
          }
        },
        {
          "type": "SYMBOL",
          "name": "_dedent"
        }
      ]
    },
    "enum_member": {
      "type": "SEQ",
      "members": [
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": "\n"
        }
      ]
    },
    "enum_type": {
      "type": "SYMBOL",
      "name": "identifier"
    },
    "_interface_body": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "\n"
        },
        {
          "type": "SYMBOL",
          "name": "_indent"
        },
        {
          "type": "REPEAT",
          "content": {
            "type": "SYMBOL",
            "name": "interface_function"
          }
        },
        {
          "type": "SYMBOL",
          "name": "_dedent"
        }
      ]
    },
    "interface_function": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "def"
        },
        {
          "type": "FIELD",
          "name": "name",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "FIELD",
          "name": "parameters",
          "content": {
            "type": "SYMBOL",
            "name": "parameters"
          }
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "SEQ",
            "members": [
              {
                "type": "STRING",
                "value": "->"
              },
              {
                "type": "FIELD",
                "name": "return_type",
                "content": {
                  "type": "SYMBOL",
                  "name": "type"
                }
              }
            ]
          }
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "mutability",
          "content": {
            "type": "SYMBOL",
            "name": "interface_mutability"
          }
        },
        {
          "type": "STRING",
          "value": "\n"
        }
      ]
    },
    "interface_mutability": {
      "type": "CHOICE",
      "members": [
        {
          "type": "STRING",
          "value": "view"
        },
        {
          "type": "STRING",
          "value": "pure"
        },
        {
          "type": "STRING",
          "value": "nonpayable"
        },
        {
          "type": "STRING",
          "value": "payable"
        }
      ]
    },
    "implements_statement": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "implements"
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "interface",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": "\n"
        }
      ]
    },
    "implements_multiple_statement": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "implements"
        },
        {
          "type": "STRING",
          "value": ":"
        },
        {
          "type": "FIELD",
          "name": "interfaces",
          "content": {
            "type": "SYMBOL",
            "name": "_interface_list"
          }
        },
        {
          "type": "STRING",
          "value": "\n"
        }
      ]
    },
    "_interface_list": {
      "type": "SEQ",
      "members": [
        {
          "type": "FIELD",
          "name": "interface",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "REPEAT",
          "content": {
            "type": "SEQ",
            "members": [
              {
                "type": "STRING",
                "value": ","
              },
              {
                "type": "FIELD",
                "name": "interface",
                "content": {
                  "type": "SYMBOL",
                  "name": "identifier"
                }
              }
            ]
          }
        },
        {
          "type": "OPTIONAL",
          "content": {
            "type": "STRING",
            "value": ","
          }
        }
      ]
    },
    "import_interface_statement": {
      "type": "SEQ",
      "members": [
        {
          "type": "STRING",
          "value": "from"
        },
        {
          "type": "FIELD",
          "name": "module",
          "content": {
            "type": "SYMBOL",
            "name": "dotted_name"
          }
        },
        {
          "type": "STRING",
          "value": "import"
        },
        {
          "type": "FIELD",
          "name": "interface",
          "content": {
            "type": "SYMBOL",
            "name": "identifier"
          }
        },
        {
          "type": "STRING",
          "value": "\n"
        }
      ]
    }
  },
  "externals": [
    {
      "type": "STRING",
      "value": "uint8"
    },
    {
      "type": "STRING",
      "value": "uint16"
    },
    {
      "type": "STRING",
      "value": "uint32"
    },
    {
      "type": "STRING",
      "value": "uint64"
    },
    {
      "type": "STRING",
      "value": "uint128"
    },
    {
      "type": "STRING",
      "value": "int8"
    },
    {
      "type": "STRING",
      "value": "int16"
    },
    {
      "type": "STRING",
      "value": "int32"
    },
    {
      "type": "STRING",
      "value": "int64"
    },
    {
      "type": "STRING",
      "value": "int128"
    },
    {
      "type": "STRING",
      "value": "bytes"
    },
    {
      "type": "STRING",
      "value": "string"
    }
  ]
};