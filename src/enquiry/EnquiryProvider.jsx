import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EnquiryContext } from "./context";

const STORAGE_KEY = "delux-enquiry-v1";

function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// Holds the buyer's enquiry list (products + chosen variant, pack size and quantity)
// and remembers it in this browser between visits.
export default function EnquiryProvider({ children }) {
  const [items, setItems] = useState(loadItems);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable (private mode etc.); the list still works for this visit.
    }
  }, [items]);

  const has = useCallback((id) => items.some((i) => i.id === id), [items]);

  const add = useCallback((product) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              variant: product.variants[0] ?? "",
              packSize: product.packSizes[0] ?? "",
              qty: 1,
            },
          ]
    );
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);

  const update = useCallback(
    (id, changes) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...changes } : i))),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, has, add, remove, update, clear, open, setOpen }),
    [items, has, add, remove, update, clear, open]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}
