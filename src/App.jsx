import { monthlyAggregatePoints } from "./utils/monthlyAndTotalAggregatePoints.js";
import { MOCK_DATA_URL, NUMBER_OF_MONTHS } from "./utils/config.js";
import { AllTransactions } from "./components/AllTransactions";
import { MonthlyRewards } from "./components/MonthlyRewards";
import TotalRewards from "./components/TotalRewards.jsx";
import filterByMonths from "./utils/filterByMonths.js";
import { useFetchTransactions } from "./hooks/useFetchTransactions.js";
import { useMemo } from "react";

function App() {
  const { data, loading, error } = useFetchTransactions(MOCK_DATA_URL);
  const todaysDate = new Date().toISOString().split("T")[0];
  const last3MonthsData = useMemo(
    () => filterByMonths(data, todaysDate, NUMBER_OF_MONTHS),
    [data, todaysDate, NUMBER_OF_MONTHS]
  );
  const calculatedRewards = useMemo(
    () => monthlyAggregatePoints(last3MonthsData),
    [last3MonthsData]
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reward System</h1>

      <h3 style={{ textAlign: "center" }}>All Transactions</h3>
      <AllTransactions transactions={data} />

      <h3 style={{ textAlign: "center" }}>Monthly Rewards in last 3 months</h3>
      <MonthlyRewards rewards={calculatedRewards} />

      <div style={{ width: "60%" }}>
        <h3 style={{ textAlign: "center" }}>Total Rewards</h3>
      </div>
      <TotalRewards rewards={calculatedRewards} />
    </>
  );
}

export default App;
