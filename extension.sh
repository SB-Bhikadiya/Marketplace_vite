#!/bin/bash

# Function to recursively change file extension
change_file_extension() {
  # Find all JavaScript files recursively
  find "$1" -type f -name "*.js" |
  while read -r js_file; do
    # Change the file extension to .jsx
    jsx_file="${js_file%.js}.jsx"
    # Rename the file
    mv "$js_file" "$jsx_file"
    echo "Changed file: $js_file to $jsx_file"
  done
}

# Start the recursive process
change_file_extension "$1"
