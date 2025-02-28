import { calculatePoint } from "../utils/calculatePoints";
import filterByMonths from "../utils/filterByMonths";
import { monthlyAggregatePoints } from "../utils/monthlyAndTotalAggregatePoints";


describe('calculateRewards', () => {
  it('should return the correct rewards points when the amount is greater than 100', () => {
    expect(calculatePoint(200)).toBe(250); // (200-100)*2 + 50 = 250
  });

  it('should return the correct rewards points when the amount is less than 100', () => {
    expect(calculatePoint(70)).toBe(20); // 70-50=20
  });

  it('should return 0 rewards points when the amount is 50 or less', () => {
    expect(calculatePoint(40)).toBe(0); // 0 reward points for amounts below 50
  });

  it('should return 0 when amount is NaN', () => {
    expect(calculatePoint(NaN)).toBe(0); // Handles invalid inputs like NaN
  });

  it('should return 0 when amount is undefined', () => {
    expect(calculatePoint(undefined)).toBe(0); // Handles undefined input
  });

  it('should return 0 when amount is null', () => {
    expect(calculatePoint(null)).toBe(0); // Handles null input
  });
});


describe('aggregatingMonthlyRewardsForCustomer', () => {
  it('should aggregate total rewards for each user for each month', () => {
    const userData = [
      {
        "transactionId": "1f8d1737-2fa8-4b29-9cc1-3df1d663e774",
        "customerId": 1,
        "name": "John Doe",
        "date": "2024-11-03T17:46:46.835Z",
        "productName": "Small Silk Ball",
        "amount": 100.29,
      },
      {
        "transactionId": "98ed4ed1-7c4f-41cd-a14a-f641e0a67db4",
        "customerId": 4,
        "name": "Bob Brown",
        "date": "2025-01-19T00:10:28.047Z",
        "productName": "Generic Bamboo Soap",
        "amount": 386,
      },
      {
        "transactionId": "1aade410-7dd9-4844-93f8-9070cdf55877",
        "customerId": 4,
        "name": "Bob Brown",
        "date": "2024-12-07T17:53:57.766Z",
        "productName": "Licensed Cotton Bacon",
        "amount": 464.45,
      },
      {
        "transactionId": "1vade410-7dd9-4844-93f8-9070cdf55877",
        "customerId": 4,
        "name": "Bob Brown",
        "date": "2024-12-27T17:53:57.766Z",
        "productName": "Licensed Cotton Bacon",
        "amount": 120,
      }

    ]

    const result = monthlyAggregatePoints(userData);



    expect(Object.keys(result).length).toBe(2); // Three unique (customerId, month) pairs
    expect(result).toEqual({
      '1': {
        name: 'John Doe',
        rewardsByMonth: { 'November 2024': 50 },
        totalReward: 50
      },
      '4': {
        name: 'Bob Brown',
        rewardsByMonth: { 'January 2025': 622, 'December 2024': 868 },
        totalReward: 1490
      }
    }); // John Doe (Nov 2024) total = 50

  });
});



describe('filterByMonths', () => {
  const data = [
    { name: 'Item 1', date: '2024-10-20' },
    { name: 'Item 2', date: '2024-11-15' },
    { name: 'Item 3', date: '2025-02-05' },
    { name: 'Item 4', date: '2025-01-10' },
    { name: 'Item 5', date: '2024-09-25' },
    { name: 'Item 6', date: 'invalid date' },
  ];

  const todaysDate = '2025-02-28';
  const monthsToFilter = 3;

  it('should filter data based on the specified number of months', () => {
    const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
    expect(filteredData).toEqual([
      { name: 'Item 3', date: '2025-02-05' },
      { name: 'Item 4', date: '2025-01-10' }
    ]);
  });

  it('should handle year rollovers correctly', () => {
    const todaysDate2 = '2025-01-31';
    const monthsToFilter2 = 3;
    const filteredData2 = filterByMonths(data, todaysDate2, monthsToFilter2);
    expect(filteredData2).toEqual([
      { name: 'Item 2', date: '2024-11-15' },
      { name: 'Item 3', date: '2025-02-05' },
      { name: 'Item 4', date: '2025-01-10' }
    ]);
  });

  it('should handle invalid date strings in data', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
    const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
    expect(filteredData).toEqual([
      { name: 'Item 3', date: '2025-02-05' },
      { name: 'Item 4', date: '2025-01-10' }
    ]);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid date encountered: itemDate - invalid date, todaysDate - 2025-02-28'
    );
    consoleWarnSpy.mockRestore();
  });
});