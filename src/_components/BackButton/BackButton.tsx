import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { useLocation, useNavigate, ScrollRestoration } from "react-router";
import { ERoutes } from "../../api";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromOtherSite = location.key === "default";

  const goBack = useCallback(async () => {
    if (cameFromOtherSite) {
      await navigate("/", { replace: true });
    } else {
      await navigate(-1);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [navigate]);

  if (location.pathname === ERoutes.Home) {
    return <></>;
  }

  return (
    <div
      className="flex gap-2 text-stone-500 cursor-pointer mb-4"
      onClick={goBack}
    >
      <ArrowLeftOutlined />
      <span>Назад</span>
    </div>
  );
};

export default BackButton;
