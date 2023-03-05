import { useCallback, useState } from 'react';

const useRequest = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfiguration, dataHandlerFn) => {
    try {
      setIsLoading(true);
      const response = await fetch(requestConfiguration.url, {
        method: requestConfiguration.method ? requestConfiguration.method : 'GET',
        headers: requestConfiguration.headers ? requestConfiguration.headers : {},
        body: requestConfiguration.body ? JSON.stringify(requestConfiguration.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      dataHandlerFn(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return { error, isLoading, sendRequest };
};

export default useRequest;
