// src/hooks/useFetch.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetch(initialUrl: string) {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!url) return; // Avoid running on initial mount without a URL
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  // Refetch with an optional new URL
  const refetch = (newUrl?: string) => {
    if (newUrl) setUrl(newUrl);
    else setUrl(url); // Trigger refetch if no new URL provided
  };

  return { data, loading, error, refetch };
}

export default useFetch;
