// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 99, b: 1, action: Action.Add });
    expect(result).toBe(100);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 100, b: 1, action: Action.Subtract });
    expect(result).toBe(99);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 99, b: 99, action: Action.Multiply });
    expect(result).toBe(9801);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 99, b: 99, action: Action.Divide });
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Exponentiate });
    expect(result).toBe(125);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 100, b: 1, action: 'Action.Add' });
    expect(result).toBe(null);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '100', b: 1, action: Action.Add });
    expect(result).toBe(null);
    expect(result).toBeNull();
  });
});
