import { describe, expect } from "vitest";

import { add } from './index'

describe("String calculator TDD", () => {
  
  it("1. should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("2. should return the same number for a single number", () => {
    expect(add("3")).toBe(3);
    expect(add("10")).toBe(10);
  });

  it("3. should return the sum of two numbers separated by comma", () => {
    expect(add("3,4")).toBe(7);
    expect(add("10,15")).toBe(25);
  });

  it("4. should return the sum of numbers separated by comma", () => {
    expect(add("3,6,9")).toBe(18);
    expect(add("10,15,10,5,10,25,20")).toBe(80);
  });
});