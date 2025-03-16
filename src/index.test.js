import { describe } from "vitest";

import { add } from './index'

describe("String calculator TDD", () => {
  
  it("1. should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });
});