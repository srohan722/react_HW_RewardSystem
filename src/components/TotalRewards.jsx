import PropTypes from "prop-types";
import React from "react";


const TotalRewards = ({ rewards }) => {
  return (
    <table className="total-rewards-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Total Rewards Earned</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(rewards).map(([customerId, { name, totalReward }]) => (
          <tr key={customerId}>
            <td>{name}</td>
            <td>{totalReward}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
TotalRewards.propTypes = {
  rewards: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      totalReward: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default React.memo(TotalRewards);
