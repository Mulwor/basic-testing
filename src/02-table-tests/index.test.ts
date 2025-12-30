import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 99, b: 1, action: Action.Add, expected: 100 },
  { a: 100, b: 1, action: Action.Subtract, expected: 99 },
  { a: 99, b: 99, action: Action.Multiply, expected: 9801 },
  { a: 99, b: 99, action: Action.Divide, expected: 1 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 100, b: 1, action: 'Action.Add', expected: null },
  { a: '100', b: 1, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'Should return correct result',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
