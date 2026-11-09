import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import company from "../data/company";
import { getAnalyticsConsent, onConsentChange } from "../privacy/consent";

const ID = company.gaMeasurementId;

function load() {
  if (window.gtag) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ID, { send_page_view: false, anonymize_ip: true });
}

// Loads Google Analytics 4 only after the visitor accepts analytics cookies, then records a
// page view on every route change (this is a single-page site).
export default function Analytics() {
  const { pathname, search } = useLocation();
  const [granted, setGranted] = useState(() => getAnalyticsConsent() === "granted");

  useEffect(() => onConsentChange((v) => setGranted(v === "granted")), []);

  useEffect(() => {
    if (ID && granted) load();
    // If consent is withdrawn, stop sending further hits for the rest of the visit.
    if (ID && !granted) window[`ga-disable-${ID}`] = true;
    else if (ID) window[`ga-disable-${ID}`] = false;
  }, [granted]);

  useEffect(() => {
    if (!ID || !granted || !window.gtag) return;
    // Wait a tick so the page has set its own title first.
    const t = setTimeout(() => {
      window.gtag("event", "page_view", {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [pathname, search, granted]);

  return null;
}
