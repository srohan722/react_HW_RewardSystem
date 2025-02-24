import useFetch from "../hooks/useFetch";


const fetchFromMockData = () =>{
    const { data, loading, error } = useFetch('/mockDataApi.js');
    return {data,loading,error}
}

export default fetchFromMockData


