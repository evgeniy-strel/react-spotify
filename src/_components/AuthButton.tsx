import { useEffect } from "react";
import { openLoginPage, fetchAccessToken } from "../auth";
import { useSearchParams } from "react-router";

const AuthButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetchAccessToken(code);
    }
  }, [code]);

  return <></>;
};

export default AuthButton;
