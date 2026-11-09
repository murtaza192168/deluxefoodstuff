import { useEffect, useRef, useState } from "react";

// Returns a number that goes up each time `count` increases (not on first render),
// so it can be used as a React key to replay a small "bump" animation.
export default function useBump(count) {
  const prev = useRef(count);
  const [bump, setBump] = useState(0);
  useEffect(() => {
    if (count > prev.current) setBump((b) => b + 1);
    prev.current = count;
  }, [count]);
  return bump;
}
