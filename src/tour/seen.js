// Remembers (per browser) which one-time guides a visitor has already seen.
export function tourSeen(key) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return true; // storage blocked: don't nag
  }
}

export function markSeen(key) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    /* storage blocked */
  }
}
