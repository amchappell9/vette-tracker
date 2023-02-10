import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import * as axeMatchers from "vitest-axe/matchers";
import "vitest-axe/extend-expect";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);
expect.extend(axeMatchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
