import React from 'react'

const TotalRewards = ({rewards}) => {
  return (
    <table>
        <thead><tr>

            <th>Customer Name</th>
            <th>Total Rewards Earned</th>
        </tr>
        </thead>

        <tbody>
        {Object.entries(rewards).map(([customerId, { Name, totalReward }]) => (
          <tr key={customerId}>
            <td>{Name}</td>
            <td>{totalReward}</td>
          </tr>))}
        </tbody>
    </table>
  )
}

export default TotalRewards