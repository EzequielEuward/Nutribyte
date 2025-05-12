import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TRACKING_ID = "G-R0Z51YJ2CJ";

ReactGA.initialize(TRACKING_ID);

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
};
