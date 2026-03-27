import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);
  return null;
};

export default ScrollHash;
