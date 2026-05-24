import 'vitest';
import { AxeMatchers } from 'vitest-axe';

interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<void> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
