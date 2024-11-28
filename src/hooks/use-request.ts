import { useEffect, useState } from "react";

export default function useRequest(func, params?: any, autoFetch = false) {
  const [variables, setVariables] = useState(params);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [[response, error], setResponseAndError] = useState([null, null]);

  useEffect(() => {
    if (autoFetch) makeRequest();
  }, [JSON.stringify(params)]);

  async function makeRequest(data = params) {
    setIsLoading(true);
    setVariables(data);
    setResponseAndError([null, null])

    const [response, error] = await func(data);
    setResponseAndError([response, error]);
    setIsLoading(false);

    return [response, error];
  }

  return { makeRequest, response, error, isLoading, variables };
}
