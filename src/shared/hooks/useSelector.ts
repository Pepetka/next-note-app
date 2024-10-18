import { useContext, useMemo, useRef } from "react";
import { StoreContext, StoreContextType } from "../providers";

type Selector<T> = (store: Omit<StoreContextType, "dispatch">) => T;

export const useSelector = <T>(selector: Selector<T>): Partial<T> => {
  const selectorRef = useRef<Selector<T> | null>(null);
  const store = useContext(StoreContext);

  selectorRef.current = selector;

  return useMemo(() => selectorRef.current?.(store) ?? {}, [store]);
};
