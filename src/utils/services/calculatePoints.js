export const calculatePoint = (amount) =>{

    if(amount<=50) return 0;

    if(amount>50 && amount<=100){
        return Math.floor(amount-50); 
    }

    else{
        let moreThan100 = Math.floor(amount-100) * 2;

        return (moreThan100 + 50)
    }

}