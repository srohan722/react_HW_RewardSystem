import { calculatePoint } from "../utils/calculatePoints";
import filterByMonths from "../utils/filterByMonths";
import logger from "../utils/logger";
import { monthlyAggregatePoints } from "../utils/monthlyAndTotalAggregatePoints";




describe('calculatePoint', () => {
  test('should return 0 for amounts less than or equal to 50', () => {
    expect(calculatePoint(40)).toBe(0);
    expect(calculatePoint(50)).toBe(0);
  });

  test('should return 0 for non-number inputs', () => {
    expect(calculatePoint('abc')).toBe(0);
    expect(calculatePoint(NaN)).toBe(0);
    expect(calculatePoint({})).toBe(0);
    expect(calculatePoint([])).toBe(0);
  });

  test('should return 0 for null and undefined inputs', () => {
    expect(calculatePoint(null)).toBe(0);
    expect(calculatePoint(undefined)).toBe(0);
  });

  test('should return the correct points for amounts between 51 and 100', () => {
    expect(calculatePoint(60)).toBe(10);
    expect(calculatePoint(80)).toBe(30);
    expect(calculatePoint(100)).toBe(50);
    expect(calculatePoint(51)).toBe(1);
  });

  test('should return the correct points for amounts greater than 100', () => {
    expect(calculatePoint(120)).toBe(90); // (120 - 100) * 2 + 50 = 90
    expect(calculatePoint(150)).toBe(150); // (150 - 100) * 2 + 50 = 150
    expect(calculatePoint(200)).toBe(250); // (200 - 100) * 2 + 50 = 250
  });

  test('should handle floating-point numbers correctly', () => {
    expect(calculatePoint(60.5)).toBe(10);
    expect(calculatePoint(120.7)).toBe(90);
  });

  test('should correctly handle negative numbers', () => {
    expect(calculatePoint(-10)).toBe(0);
  });

  test('should correctly handle 0', ()=>{
    expect(calculatePoint(0)).toBe(0);
  });
});



import filterByMonths from './filterByMonths'; // Adjust the path if necessary

describe('filterByMonths', () => {
  const data = [
    { name: 'Item 1', date: '2023-10-20' },
    { name: 'Item 2', date: '2023-11-15' },
    { name: 'Item 3', date: '2023-12-05' },
    { name: 'Item 4', date: '2024-01-10' },
    { name: 'Item 5', date: '2022-09-25' },
  ];

  it('should filter data based on the specified number of months', () => {
    const todaysDate = '2023-12-31';
    const monthsToFilter = 3;
    const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
    expect(filteredData).toEqual([
      { name: 'Item 2', date: '2023-11-15' },
      { name: 'Item 3', date: '2023-12-05' },
    ]);
  });

  it('should handle different date formats', () => {
    const dataWithDifferentFormats = [
      { name: 'Item 1', date: '10/20/2023' },
      { name: 'Item 2', date: '11/15/2023' },
      { name: 'Item 3', date: '12/05/2023' },
    ];
    const todaysDate = '12/31/2023';
    const monthsToFilter = 3;
    const filteredData = filterByMonths(
      dataWithDifferentFormats,
      todaysDate,
      monthsToFilter
    );
    expect(filteredData).toEqual([
      { name: 'Item 2', date: '11/15/2023' },
      { name: 'Item 3', date: '12/05/2023' },
    ]);
  });

  it('should handle invalid date strings and log a warning', () => {
    const invalidData = [
      { name: 'Item 1', date: '2023-10-20' },
      { name: 'Item 2', date: 'invalid-date' },
    ];
    const todaysDate = '2023-12-31';
    const monthsToFilter = 3;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const filteredData = filterByMonths(invalidData, todaysDate, monthsToFilter);

    expect(filteredData).toEqual([{ name: 'Item 1', date: '2023-10-20' }]);
    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore(); // Restore the original console.warn
  });

  it('should handle empty data array', () => {
    const todaysDate = '2023-12-31';
    const monthsToFilter = 3;
    const filteredData = filterByMonths([], todaysDate, monthsToFilter);
    expect(filteredData).toEqual([]);
  });

  it('should handle numberOfMonths being 0', () => {
      const todaysDate = '2023-12-31';
      const monthsToFilter = 0;
      const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
      expect(filteredData).toEqual([]);
  });

  it('should handle todaysDate in the past', () => {
      const todaysDate = '2023-11-30';
      const monthsToFilter = 2;
      const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
      expect(filteredData).toEqual([{ name: 'Item 1', date: '2023-10-20' }]);
  });

  it('should handle todaysDate in the future', () => {
    const todaysDate = '2024-01-31';
    const monthsToFilter = 3;
    const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
    expect(filteredData).toEqual([
      { name: 'Item 2', date: '2023-11-15' },
      { name: 'Item 3', date: '2023-12-05' },
      { name: 'Item 4', date: '2024-01-10' },
    ]);
  });

  it('should handle todaysDate being the same as a date in the data', () => {
    const todaysDate = '2023-12-05';
    const monthsToFilter = 2;
    const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
    expect(filteredData).toEqual([{ name: 'Item 2', date: '2023-11-15' }]);
  });
});



// Mock calculatePoint and logger for testing
jest.mock('./calculatePoints', () => ({
  calculatePoint: jest.fn(),
}));

jest.mock('./logger', () => ({
  error: jest.fn(),
}));

describe('monthlyAggregatePoints', () => {
  const transactions = [
    { customerId: '1', name: 'Alice', date: '2023-11-15', amount: 120 },
    { customerId: '1', name: 'Alice', date: '2023-10-20', amount: 80 },
    { customerId: '2', name: 'Bob', date: '2023-11-05', amount: 50 },
    { customerId: '2', name: 'Bob', date: '2023-12-10', amount: 150 },
    { customerId: '1', name: 'Alice', date: '2023-12-01', amount: 200},
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('should calculate monthly aggregate reward points correctly', () => {
    calculatePoint.mockImplementation((amount) => {
      if (amount > 100) return (amount - 100) * 2 + 50;
      if (amount > 50) return amount - 50;
      return 0;
    });

    const result = monthlyAggregatePoints(transactions);

    expect(result).toEqual({
      '1': {
        name: 'Alice',
        rewardsByMonth: {
          'December 2023': 250,
          'November 2023': 90,
          'October 2023': 30,
        },
        totalReward: 370,
      },
      '2': {
        name: 'Bob',
        rewardsByMonth: {
          'December 2023': 150,
          'November 2023': 0,
        },
        totalReward: 150,
      },
    });
  });

  it('should handle empty transactions array', () => {
    const result = monthlyAggregatePoints([]);
    expect(result).toEqual({});
  });

  it('should handle transactions with invalid dates and sort them correctly', () => {
    const invalidTransactions = [
      { customerId: '1', name: 'Alice', date: '2023-11-15', amount: 120 },
      { customerId: '2', name: 'Bob', date: 'invalid-date', amount: 50 },
      { customerId: '1', name: 'Alice', date: '2023-10-20', amount: 80 },
    ];
    calculatePoint.mockReturnValue(10);
    const result = monthlyAggregatePoints(invalidTransactions);
    expect(result).toEqual({
      '1': {
        name: 'Alice',
        rewardsByMonth: {
          'November 2023': 10,
          'October 2023': 10,
        },
        totalReward: 20,
      },
    });
  });

  it('should call logger.error and return an empty object on error', () => {
    const invalidTransactions = [
      { customerId: '1', name: 'Alice', date: null, amount: 120 }, //trigger error
    ];
    const result = monthlyAggregatePoints(invalidTransactions);
    expect(logger.error).toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it('should correctly handle a customer with only one transaction', () => {
    calculatePoint.mockReturnValue(100);
    const singleTransaction = [{ customerId: '1', name: 'Alice', date: '2023-12-01', amount: 100 }];
    const result = monthlyAggregatePoints(singleTransaction);
    expect(result).toEqual({
      '1': {
        name: 'Alice',
        rewardsByMonth: { 'December 2023': 100 },
        totalReward: 100,
      },
    });
  });

  it('should handle zero amount transactions', () => {
    calculatePoint.mockReturnValue(0);
    const zeroAmountTransaction = [{ customerId: '1', name: 'Alice', date: '2023-12-01', amount: 0 }];
    const result = monthlyAggregatePoints(zeroAmountTransaction);
    expect(result).toEqual({
      '1': {
        name: 'Alice',
        rewardsByMonth: { 'December 2023': 0 },
        totalReward: 0,
      },
    });
  });
});