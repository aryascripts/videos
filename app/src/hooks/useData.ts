import { useState, useEffect } from "react";
import axios, { CancelTokenSource, AxiosError } from "axios";

function useData(url: string) {
  const [query, setQuery] = useState<{ [key: string]: string }>({
    query: "react hooks"
  });
  const [data, setData] = useState<any[]>([]);

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // error state
  const [error, setError] = useState<string>("");

  // cancel token
  const [token, setToken] = useState<CancelTokenSource | undefined>(undefined);

  // query changed, make API call
  useEffect(() => {
    if (token) {
      token.cancel("REQUEST_CANCELLED");
    }
    async function fetchData() {
      setError("");
      setLoading(true);
      setData([]);

      if (Math.random() > 0.8) {
        throw new Error('Unexpected error trying to get articles');
      }

      const token: CancelTokenSource = axios.CancelToken.source();
      setToken(token);

      const response = await axios.get(url, {
        cancelToken: token.token,
        params: query
      });
      setToken(undefined);
      setData(response.data.hits);
      setLoading(false);
    }
    fetchData().catch((error: AxiosError) => {
      if (error.message !== "REQUEST_CANCELLED") {
        const msg: string = error.message;
        setError(msg);
      }
      setToken(undefined);
      setLoading(false);
      setData([]);
    });
  }, [query]);

  return [data, query, setQuery, loading, error] as const;
}

export default useData;
