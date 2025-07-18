import "@testing-library/jest-dom";
import { server } from "../mocks/server";

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
