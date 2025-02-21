import React from 'react'

export const MonthlyRewards = ({ rewards }) => {
    
    return (
        <>
        <table>
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
        {Object.entries(rewards).map(([customerId, { Name, rewardsByMonth }]) =>
          Object.entries(rewardsByMonth).map(([monthYear, points]) => {
            const [month, year] = monthYear.split(" ");
            return (
              <tr key={`${customerId}-${monthYear}`}>
                <td>{customerId}</td>
                <td>{Name}</td>
                <td>{month}</td>
                <td>{year}</td>
                <td>{points}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
        </>
    )
}
