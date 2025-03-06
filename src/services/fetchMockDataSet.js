import logger from "../utils/logger";

/**
 * Fetches JSON data from a URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the parsed JSON data.
 * @throws {Error} - Throws an error if the fetch fails or the response is not OK.
 */

const fetchService = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    logger.error("Fetch error:", error);
    throw error;
  }
};

export default fetchService;
