import React from 'react';
import PropTypes from 'prop-types';
import { calculatePoint } from '../utils/services/calculatePoints';

export const AllTransactions = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Product</th>
          <th>Price ($)</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ TransactionId, CustomerId, Name, date, ProductName, Amount }) => (
          <tr key={TransactionId}>
            <td>{TransactionId}</td>
            <td>{CustomerId}</td>
            <td>{Name}</td>
            <td>{date ? new Date(date).toLocaleDateString() : 'Invalid Date'}</td>
            <td>{ProductName}</td>
            <td>{Amount}</td>
            <td>{calculatePoint(Amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AllTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      TransactionId: PropTypes.string.isRequired,
      CustomerId: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      ProductName: PropTypes.string.isRequired,
      Amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AllTransactions;
