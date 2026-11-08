import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import company from "../data/company";

const ID = company.gaMeasurementId;

// Loads Google Analytics 4 once (only when a measurement ID is set) and records a page view
// on every route change, since this is a single-page site.
export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!ID || window.gtag) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!ID || !window.gtag) return;
    // Wait a tick so the page has set its own title first.
    const t = setTimeout(() => {
      window.gtag("event", "page_view", {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [pathname, search]);

  return null;
}
