import {calculatePoint} from './calculatePoints'
export const monthlyAggregatePoints = ( transactions ) => {
    try {

        const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

        return sortedTransactions.reduce((acc,transaction)=>{
            const {CustomerId,Name,date,Amount} = transaction;
            const monthYear = new Date(date).toLocaleString("default", {month :"long",year:"numeric"})

            if(!acc[CustomerId]){
                acc[CustomerId] = {
                    Name,
                    rewardsByMonth : {},
                    totalReward : 0
                }
            }


            if(!acc[CustomerId].rewardsByMonth[monthYear]){
                acc[CustomerId].rewardsByMonth[monthYear]=0
            }

            const points = calculatePoint(Amount)
            acc[CustomerId].rewardsByMonth[monthYear] += points;
            acc[CustomerId].totalReward += points;


            return acc;
        },{})
    } catch (error) {

        console.error("Error Found!",error)
        return {}
    }
}