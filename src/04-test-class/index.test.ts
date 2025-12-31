import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const balance = getBankAccount(100);

  test('should create account with initial balance', () => {
    expect(balance.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => balance.withdraw(102)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => balance.transfer(102, balance)).toThrow(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => balance.transfer(100, balance)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(balance.deposit(1).getBalance()).toBe(101);
  });

  test('should withdraw money', () => {
    expect(balance.withdraw(2).getBalance()).toBe(99);
  });

  test('should transfer money', () => {
    const transfer = balance.transfer(5, getBankAccount(3));
    expect(transfer.getBalance()).toBe(94);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(balance, 'fetchBalance').mockResolvedValueOnce(95);
    await expect(balance.synchronizeBalance()).resolves.not.toThrow();
    expect(balance.getBalance()).toBe(95);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(balance, 'fetchBalance').mockResolvedValueOnce(95);
    await balance.synchronizeBalance();
    expect(balance.getBalance()).toBe(95);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(balance, 'fetchBalance').mockResolvedValueOnce(null);
    const balanceSync = balance.synchronizeBalance();
    await expect(balanceSync).rejects.toThrow(SynchronizationFailedError);
  });
});
