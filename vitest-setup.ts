import { afterAll, afterEach, beforeAll } from "vitest";
import * as matchers from "vitest-axe/matchers";
import "@testing-library/jest-dom";
import "vitest-axe/extend-expect";
import { server } from "./tests/mocks/server";

expect.extend(matchers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());
