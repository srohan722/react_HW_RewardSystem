import { useEffect, useState } from "react";
import fetchService from "../services/fetchMockDataSet";

/**
 * Fetches data from a URL using fetchService, providing loading and error states.
 *
 * @param {string} url - The URL to fetch.
 * @returns {{ data: any[], loading: boolean, error: Error|null }} - Data, loading status, and error.
 */

export const useFetchTransactions = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchService(url);
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
          setError(null);
        } else {
          setError(new Error("Invalid Format"));
        }
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
