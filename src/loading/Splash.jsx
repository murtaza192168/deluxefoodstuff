import React, { useEffect } from "react";

// The branded loading screen lives in index.html so it shows instantly.
// Mounting <SplashDone /> (inside Suspense, next to the page) fades it out.
export function SplashDone() {
  useEffect(() => {
    const el = document.getElementById("splash");
    if (!el) return;
    el.classList.add("gone");
    const t = setTimeout(() => el.remove(), 600);
    return () => clearTimeout(t);
  }, []);
  return null;
}

// Shown in the page area while a page's code downloads on later navigations.
export function RouteLoader() {
  if (document.getElementById("splash")) return null;
  return (
    <div className="dl-inline" role="status" aria-label="Loading">
      <div className="dl-box">
        <div className="dl-line" />
      </div>
    </div>
  );
}
