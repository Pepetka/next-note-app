"use client";

import { createContext } from "react";
import type { UseToDoReturn } from "@/shared/hooks/useToDo";

export type StoreContextType = UseToDoReturn;

export const StoreContext = createContext<StoreContextType>({} as StoreContextType);
