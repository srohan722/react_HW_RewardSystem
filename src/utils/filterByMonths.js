/**
 * Filters an array of data objects to include only items with dates within a specified number of months
 * prior to a given date.
 *
 * The function parses date strings from the `data` array and the `todaysDateString` parameter into
 * JavaScript `Date` objects for accurate month comparison, handling year rollovers correctly.
 * It assumes the date strings are in a format that `new Date()` can parse (e.g., "YYYY-MM-DD", "MM/DD/YYYY", etc.).
 * If date strings are invalid, a warning is logged to the console, and those data items are filtered out.
 *
 * @param {Array<Object>} data - An array of data objects.
 *                                Each object in the array is expected to have a property named 'date'
 *                                which is a string representing a date.
 * @param {string} todaysDateString - A string representing today's date.
 *                                     This date is used as the reference point for filtering.
 *                                     It should be in a format that `new Date()` can parse.
 * @param {number} numberOfMonths - The number of months to filter back from `todaysDateString`.
 *                                  Data items with dates within this many months (exclusive of the current month of `todaysDateString`)
 *                                  prior to `todaysDateString` will be included in the result.
 *
 * @returns {Array<Object>} - A new array containing only the data objects from the input `data` array
 *                            whose 'date' property falls within the specified number of months
 *                            prior to `todaysDateString`.
 *
 * @example
 * const data = [
 *   { name: 'Item 1', date: '2023-10-20' },
 *   { name: 'Item 2', date: '2023-11-15' },
 *   { name: 'Item 3', date: '2023-12-05' },
 *   { name: 'Item 4', date: '2024-01-10' },
 *   { name: 'Item 5', date: '2022-09-25' }, // Older date
 * ];
 * const todaysDate = '2023-12-31';
 * const monthsToFilter = 3; // Filter for dates within the last 3 months (before Dec 31st)
 *
 * const filteredData = filterByMonths(data, todaysDate, monthsToFilter);
 * // filteredData will be:
 * // [
 * //   { name: 'Item 2', date: '2023-11-15' },
 * //   { name: 'Item 3', date: '2023-12-05' },
 * // ]
 * // Item 1 (Oct 20th) is just outside 3 months range (Dec, Nov, Oct - not including Oct itself as we are filtering *before* todaysDate's month)
 * // Item 4 (Jan 10th 2024) is in the future
 * // Item 5 (Sep 25th 2022) is too old
 *
 * @throws {console.warn} - If invalid date strings are encountered during parsing, a warning is logged to the console.
 *
 * @todo Consider clarifying the date format assumption and potentially adding options for different formats or more robust parsing.
 * @todo Be mindful of time zone considerations if dates are expected to represent times in different time zones.
 */
const filterByMonths = (data, todaysDateString, numberOfMonths) => {
  const todaysDate = new Date(todaysDateString);

  const result = [...data].filter(({ date: dateString }) => {
    const itemDate = new Date(dateString);

    if (isNaN(itemDate) || isNaN(todaysDate)) {
      console.warn(
        `Invalid date encountered: itemDate - ${dateString}, todaysDate - ${todaysDateString}`
      );
      return false;
    }

    const diffInMonths =
      (todaysDate.getFullYear() - itemDate.getFullYear()) * 12 +
      todaysDate.getMonth() - itemDate.getMonth();

    return diffInMonths < numberOfMonths;
  });

  return result;
};

export default filterByMonths;
