import { fetchAccessToken } from "../auth";

import { useEffect } from "react";
import { useSearchParams } from "react-router";

const useFetchAccessToken = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetchAccessToken(code);
    }
  }, [code]);

  return <></>;
};

export default useFetchAccessToken;
