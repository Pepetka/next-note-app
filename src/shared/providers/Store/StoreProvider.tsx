"use client";

import { ReactNode, useMemo } from "react";
import { useToDo } from "@/shared/hooks/useToDo";
import { StoreContext, StoreContextType } from "./StoreContext";

interface StoreProviderProps {
  children: ReactNode;
  initialState?: Partial<Omit<StoreContextType, "dispatch">>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState = {} } = props;

  const { toDos, isInitialized, dispatch } = useToDo(initialState);

  const value: StoreContextType = useMemo(
    () => ({
      toDos,
      isInitialized,
      dispatch,
    }),
    [dispatch, isInitialized, toDos],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
