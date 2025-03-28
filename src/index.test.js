import { describe, expect } from "vitest";

import { add, extractCustomDelimiter } from "./index";

describe("String calculator TDD", () => {
  describe("Basic Functionality", () => {
    it("1. should return 0 for an empty string", () => {
      expect(add("")).toBe(0);
    });

    it("2. should return the same number for a single number", () => {
      expect(add("3")).toBe(3);
      expect(add("10")).toBe(10);
    });
  });

  describe("Comma Separator", () => {
    it("3. should return the sum of two numbers separated by comma", () => {
      expect(add("3,4")).toBe(7);
      expect(add("10,15")).toBe(25);
    });

    it("4. should return the sum of numbers separated by comma", () => {
      expect(add("3,6.0,9")).toBe(18);
      expect(add("10,15,10,5,10,25,20")).toBe(95);
    });

    it("5. should return 0 for a single zero", () => {
      expect(add("0")).toBe(0);
    });

    it("6. should return 0 for multiple zeros", () => {
      expect(add("0,0,0")).toBe(0);
    });
  });

  describe("Newline Separator", () => {
    it("7. should return the sum of numbers separated by newline", () => {
      expect(add("3\n4")).toBe(7);
      expect(add("10\n15\n10\n5")).toBe(40);
    });
  });

  describe("Mixed Seprators", () => {
    it("8. should return the sum of numbers separated by comma and newline", () => {
      expect(add("3,4\n5")).toBe(12);
      expect(add("10,15\n10\n5")).toBe(40);
    });
  });

  describe("Custom Delimiters", () => {
    it("9. should return the sum of numbers with custom delimiters", () => {
      expect(add("//;\n4;3")).toBe(7);
      expect(add("//.\n4.3.2")).toBe(9);
    });

    it("10. should work with empty string with custom delimiter", () => {
      expect(add("//;\n")).toBe(0);
    });

    it("11. should work with commas and newlines when no custom delimiter", () => {
      expect(add("1,2\n3")).toBe(6);
    });

    it("12. should correctly extract custom delimiter", () => {
      const result = extractCustomDelimiter("//;\n1;2");
      expect(result.regex.toString()).toBe(/;/.toString());
      expect(result.numberString).toBe("1;2");
    });

    it("13. should return default delimiter when no custom delimiter is specified", () => {
      const result = extractCustomDelimiter("1,2\n3");
      expect(result.regex.toString()).toBe(/[,\n]/.toString());
      expect(result.numberString).toBe("1,2\n3");
    });
  });

  describe("Negative Numbers", () => {
    it("14. should throw an error if negative numbers are passed", () => {
      expect(() => add("1,2,3,-4")).toThrowError(
        "negative numbers not allowed -4"
      );
      expect(() => add("1,-2,3,-4")).toThrowError(
        "negative numbers not allowed -2,-4"
      );
    });
  });

  describe("Numbers Greater Than 1000", () => {
    it("15. should ignore numbers bigger than 1000", () => {
      expect(add("2,1001")).toBe(2);
      expect(add("1000,1001,2")).toBe(1002);
    });

    it("16. should ignore numbers bigger than 1000 with custom delimiters", () => {
      expect(add("//;\n2;1001;3")).toBe(5);
    });

    it("16.1. should multiply numbers if delimiter is an exclamation", () => {
      expect(add("//!\n2!1001!3")).toBe(6);
    });

    it("17. should handle both valid and invalid numbers", () => {
      expect(add("1,2,1001,3,1200,4")).toBe(10);
    });
  });

  describe("Delimiters of Any Length", () => {
    it("18. should extract multiple delimiters enclosed in square brackets", () => {
      const result = extractCustomDelimiter("//[***]\n1***2***3");
      expect(result.regex.toString()).toBe(/\*\*\*/.toString());
      expect(result.numberString).toBe("1***2***3");
    });

    it("19. should handle delimiters of any length", () => {
      expect(add("//[***]\n1***2***3")).toBe(6);
      expect(add("//[****]\n1****2****3****4")).toBe(10);
    });

    it("20. should filter out numbers larger than 1000 with multiple delimiters", () => {
      expect(add("//[+++]\n1+++2+++1001+++3")).toBe(6);
    });
  });

  describe("Allow multiple delimiters", () => {
    it("21. should support multiple delimiters", () => {
      expect(add("//[*][%]\n1*2%3")).toBe(6);
      expect(add("//[*][%][#]\n1*2%3#4")).toBe(10);
    });

    it("22. should support multiple delimiters of any lengths", () => {
      expect(add("//[***][%%]\n1***2%%3")).toBe(6);
    });
  });
});
