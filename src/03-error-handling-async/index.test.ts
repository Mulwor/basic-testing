import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const primitiveResult = await resolveValue(99);
    const objectResult = await resolveValue({ a: 99, b: 1 });
    const arrayResult = await resolveValue([99, 1]);

    expect(primitiveResult).toBe(99);
    expect(objectResult).toEqual({ a: 99, b: 1 });
    expect(arrayResult).toHaveLength(2);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Throw error with message';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
