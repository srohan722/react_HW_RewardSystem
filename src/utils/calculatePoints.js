/**
 * Calculates reward points based on the transaction amount.
 *
 * @param {number} amount - The amount of the transaction.
 * @returns {number} The calculated reward points.
 * Will return 0 if the amount is less than or equal to 50, not a number, null, or undefined.
 */
export const calculatePoint = (amount) => {
  if (amount <= 50 || isNaN(amount) || amount === null || amount === undefined)
    return 0;

  if (amount > 50 && amount <= 100) {
    return Math.floor(amount - 50);
  } else {
    return Math.floor(amount - 100) * 2 + 50;
  }
};
