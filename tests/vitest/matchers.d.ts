import "@vitest/expect";

declare module "@vitest/expect" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): void;
  }
}
