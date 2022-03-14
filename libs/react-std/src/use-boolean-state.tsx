import { useCallback, useState } from "react";

export function useBooleanState(initial: boolean) {
  const [state, setState] = useState(initial);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((v) => !v);
  }, []);

  const set = setState;

  return {
    is: state,
    not: !state,
    setTrue,
    setFalse,
    toggle,
    set,
  };
}
