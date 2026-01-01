import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

const callback = jest.fn();
const timer = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should set timeout with provided callback and timeout', () => {
    const spyOnGlobalTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timer);
    expect(spyOnGlobalTimeout).toHaveBeenLastCalledWith(callback, timer);
    spyOnGlobalTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timer);
    expect(callback).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should set interval with provided callback and timeout', () => {
    const spyOnGlobalInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timer);
    expect(spyOnGlobalInterval).toHaveBeenCalledWith(callback, timer);
    spyOnGlobalInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timer);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5 * timer);
    expect(callback).toHaveBeenCalledTimes(10);
    jest.advanceTimersByTime(3 * timer);
    expect(callback).toHaveBeenCalledTimes(16);
    jest.advanceTimersByTime(1 * timer);
    expect(callback).toHaveBeenCalledTimes(18);
  });
});

describe('readFileAsynchronously', () => {
  const mockExistsSync = existsSync as jest.Mock;
  const mockReadFile = fs.readFile as jest.Mock;
  const mockJoin = path.join as jest.Mock;

  beforeEach(() => jest.clearAllMocks());

  test('should call join with pathToFile', async () => {
    mockExistsSync.mockReturnValue(false);

    await readFileAsynchronously('pathToFile');
    expect(mockJoin).toHaveBeenCalledWith(__dirname, 'pathToFile');
  });

  test('should return null if file does not exist', async () => {
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('pathToFile');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockExistsSync.mockReturnValue(true);

    const bufferedContent = Buffer.from('file content');
    mockReadFile.mockResolvedValue(bufferedContent);

    const result = await readFileAsynchronously('pathToFile');
    expect(result).toBe('file content');

    expect(mockReadFile).toHaveBeenCalled();
  });
});
