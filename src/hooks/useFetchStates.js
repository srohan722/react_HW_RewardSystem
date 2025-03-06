import { useEffect, useState } from "react";
import fetchService from "../services/fetchMockDataSet";

/**
 * Fetches data from a URL, providing loading and error states.
 *
 * @param {string} url - The URL to fetch.
 * @returns {{ data: any[], loading: boolean, error: Error|null }} - Data, loading status, and error.
 */

export const useFetchStates = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchService(url);
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
