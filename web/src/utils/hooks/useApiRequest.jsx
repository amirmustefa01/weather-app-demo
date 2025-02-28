"use client"
import React from "react";
import axios from "axios";

export const useApiRequest = (request) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const makeApiRequest = async () => {
      try {
        setIsLoading(true);
        const { requestUrl, options } = request;
        const weatherData = await axios.get(requestUrl, { signal });
        setData(weatherData?.data)
      } catch(e) {
        console.log("error: ", e);
        setError(e)
      } finally {
        setIsLoading(false);
      }
    };

    makeApiRequest();

    return () => { controller.abort() };

  }, [])

  return { data, isLoading, error };

}
