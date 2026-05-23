import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import { expect, vi } from "vitest";
import * as matchers from "vitest-axe/matchers";
import { server } from "../mocks/server";

expect.extend(matchers);

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: vi.fn(() => null),
});

// Start the MSW server before all tests
beforeAll(() => {
  server.listen();
});

// Reset handlers after each test so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
});

// Stop the server after all tests
afterAll(() => {
  server.close();
});
