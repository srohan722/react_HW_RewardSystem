import React from "react";
import "./styles/table.css";
import PropTypes from "prop-types";

export const MonthlyRewards = ({ rewards }) => {
  return (
    <table className="monthly-rewards-table">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Month</th>
          <th>Year</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rewards).map(([customerId, { name, rewardsByMonth }]) =>
          Object.entries(rewardsByMonth).map(([monthYear, points]) => {
            const [month, year] = monthYear.split(" ");
            return (
              <tr key={`${customerId}-${monthYear}`}>
                <td>{customerId}</td>
                <td>{name}</td>
                <td>{month}</td>
                <td>{year}</td>
                <td>{points}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

MonthlyRewards.propTypes = {
  rewards: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rewardsByMonth: PropTypes.objectOf(PropTypes.number).isRequired,
      totalReward: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default React.memo(MonthlyRewards);
