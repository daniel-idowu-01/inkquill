import { useState, useEffect } from "react";

interface User {
  success: boolean;
  message: {
    username: string;
    email: string;
    emailVerified: boolean;
    role: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

const useFetch = (url: string, options = {}, autoFetch = true) => {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (overrideOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/${url}`, {
        ...options,
        ...overrideOptions,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [url, autoFetch]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
