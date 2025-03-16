# String Calculator TDD Kata

This repository contains a JavaScript implementation of the [String Calculator TDD Kata](https://osherove.com/tdd-kata-1/) using Vite and Vitest.

## TDD Process Followed

I followed the following steps for each requirement:

1. Write a failing test
2. Commit the failing test with message like "test: add support for feature X"
3. Implement the minimal code to make the test pass
4. Commit the passing implementation with message like "feat: implement feature X"
5. Refactor if needed
6. Move to the next requirement

## Requirements Checklist

This implementation fulfills all requirements of the String Calculator kata:

- ✅ Return 0 for empty string  
- ✅ Return number for single number input  
- ✅ Return sum for two comma-separated numbers  
- ✅ Handle unknown amount of numbers  
- ✅ Allow new lines between numbers  
- ✅ Support different delimiters  
- ✅ Throw exception for negative numbers  
- ✅ Ignore numbers bigger than 1000  
- ✅ Support delimiters of any length  
- ✅ Allow multiple delimiters  
- ✅ Handle multiple delimiters with length longer than one char  
