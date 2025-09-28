import { useState } from "react";
import Cookies from "js-cookie";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    const token = Cookies.get("token");

    setLoading(true);
    setError(null);

    try {
      const defaultHeaders = {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const config = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
};
