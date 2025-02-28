import useFetch from "../hooks/useFetch"

/**
 * Fetches data from the mock data API using the useFetch custom hook.
 *
 * @returns {Object} An object containing the fetched data, loading state, and error state.
 * @returns {Array} data - The fetched data.
 * @returns {boolean} loading - The loading state.
 * @returns {Error|null} error - The error state.
 */
const fetchFromMockData = () => {
  const { data, loading, error } = useFetch("/mockDataApi.js");
  return { data, loading, error };
};

export default fetchFromMockData;
