/**
 * Calculates reward points based on the transaction amount.
 *
 * @param {number} amount - The amount of the transaction.
 * @returns {number} The calculated reward points.
 * Will return 0 if the amount is less than or equal to 50, not a number, null, or undefined.
 */
export const calculatePoint = (amount) => {
  if (typeof amount !== "number" || amount <= 50) {
    return 0;
  }

  const amountOver50 = Math.floor(amount - 50);

  if (amountOver50 <= 50) {
    return amountOver50;
  }

  return 50 + (amountOver50 - 50) * 2;
};
