import { useEffect, useState } from "react";
import logger from "../utils/logger.js";


/**
 * Custom hook to fetch data from a given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} An object containing the fetched data, loading state, and error state.
 * @returns {Array} data - The fetched data.
 * @returns {boolean} loading - The loading state.
 * @returns {Error|null} error - The error state.
 */
const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Error while fetching API: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        logger.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
