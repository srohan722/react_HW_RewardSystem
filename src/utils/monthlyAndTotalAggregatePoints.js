import { calculatePoint } from "./calculatePoints";
import logger from "./logger";

/**
 * Calculates the monthly aggregate reward points for each customer based on their transactions.
 *
 * @param {Array} transactions - An array of transaction objects.
 * @param {string} transactions[].customerId - The ID of the customer.
 * @param {string} transactions[].name - The name of the customer.
 * @param {string} transactions[].date - The date of the transaction in ISO format.
 * @param {number} transactions[].amount - The amount of the transaction.
 * @returns {Object} An object where each key is a customerId and the value is an object containing the customer's name, rewards by month, and total reward points.
 * @throws Will throw an error if the transactions array is not properly formatted.
 */
export const monthlyAggregatePoints = (transactions) => {
  try {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return sortedTransactions.reduce((acc, transaction) => {
      const { customerId, name, date, amount } = transaction;
      const monthYear = new Date(date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!acc[customerId]) {
        acc[customerId] = {
          name,
          rewardsByMonth: {},
          totalReward: 0,
        };
      }

      if (!acc[customerId].rewardsByMonth[monthYear]) {
        acc[customerId].rewardsByMonth[monthYear] = 0;
      }

      const points = calculatePoint(amount);
      acc[customerId].rewardsByMonth[monthYear] += points;
      acc[customerId].totalReward += points;

      return acc;
    }, {});
  } catch (error) {
    logger.error("Error Found!", error);
    return {};
  }
};