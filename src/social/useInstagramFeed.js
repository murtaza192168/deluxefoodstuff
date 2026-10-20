import { useEffect, useState } from "react";
import { loadInstagramFeed } from "./instagramFeed";

// status: "loading" | "ready" | "empty" | "unavailable"
export default function useInstagramFeed() {
  const [state, setState] = useState({ status: "loading", posts: [], profile: {} });

  useEffect(() => {
    let cancelled = false;
    loadInstagramFeed()
      .then(({ posts, profile }) => {
        if (!cancelled) setState({ status: posts.length ? "ready" : "empty", posts, profile });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "unavailable", posts: [], profile: {} });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
