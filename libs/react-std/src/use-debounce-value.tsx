import { useEffect, useState } from "react";

export function useDebounceValue<T>(value: T, time = 0) {
  const [v, setV] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setV(value), time);
    return () => clearTimeout(t);
  }, [value, time]);

  return v;
}
