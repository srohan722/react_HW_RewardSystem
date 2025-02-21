import useFetch from './utils/hooks/useFetch.js'
import {monthlyAggregatePoints} from './utils/services/monthlyAndTotalAggregatePoints'
import { AllTransactions } from './components/AllTransactions';
import { MonthlyRewards } from './components/MonthlyRewards';

function App() {
  const { data, loading, error } = useFetch('/mockDataApi.js');
  


  const calculatedRewards = monthlyAggregatePoints(data)


   if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>
  return (
    <>
    <h1 style={{textAlign : 'center'}}>Reward System</h1>

    <h3 style={{textAlign : 'center'}}>Transactions</h3>
    <AllTransactions transactions = {data}/>

    <h3 style={{textAlign : 'center'}}>Monthly Rewards</h3>
    <MonthlyRewards rewards = {calculatedRewards}/>

    </>
  )
}

export default App
