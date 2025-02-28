import React from "react";
import PropTypes from "prop-types";
import { calculatePoint } from "../utils/calculatePoints";

export const AllTransactions = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>name</th>
          <th>Date</th>
          <th>Product</th>
          <th>Price ($)</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(
          ({ transactionId, customerId, name, date, productName, amount }) => (
            <tr key={transactionId}>
              <td>{transactionId}</td>
              <td>{customerId}</td>
              <td>{name}</td>
              <td>
                {date ? new Date(date).toLocaleDateString() : "Invalid Date"}
              </td>
              <td>{productName}</td>
              <td>{amount}</td>
              <td>{calculatePoint(amount)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

AllTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      productName: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AllTransactions;
