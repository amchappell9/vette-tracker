import '@testing-library/jest-dom'
import { server } from './tests/mocks/server'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'vitest-axe/dist/matchers'

expect.extend({ toHaveNoViolations });

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
