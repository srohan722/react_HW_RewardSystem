/**
 * Filters data objects by date within a specified number of months.
 *
 * @param {Array<Object>} data - Array of data objects with 'date' property.
 * @param {string} todaysDateString - Reference date string.
 * @param {number} numberOfMonths - Number of months to filter back.
 * @returns {Array<Object>} Filtered data objects.
 * Filters data where 'date' is within numberOfMonths prior to todaysDateString.
 * Logs warnings for invalid dates.
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
      todaysDate.getMonth() -
      itemDate.getMonth();

    return diffInMonths < numberOfMonths;
  });

  return result;
};

export default filterByMonths;
