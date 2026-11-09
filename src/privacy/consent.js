// Visitor's choice about analytics cookies, kept in this browser only.
const KEY = "delux-analytics-consent";
const EVENT = "delux-consent-change";

export function getAnalyticsConsent() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(value) {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: the choice applies to this visit only.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function onConsentChange(handler) {
  const fn = (e) => handler(e.detail);
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}
