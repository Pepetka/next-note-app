import { Reducer, useEffect, useReducer, useState } from "react";
import type { ToDo } from "@/shared/types/ToDo";

const getSavedToDos = () => {
  if (typeof window === "undefined") return [];
  const toDos = localStorage.getItem("toDos");
  return toDos ? JSON.parse(toDos) : [];
};

const saveToDos = (toDos: ToDo[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("toDos", JSON.stringify(toDos));
};

const removeToDo = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("toDos");
};

export type Action =
  | {
      type: "Add" | "DeleteAll" | "Change";
      payload: ToDo;
    }
  | {
      type: "Delete";
      payload: string;
    }
  | {
      type: "Reset";
    };

const reducer: Reducer<ToDo[], Action> = (state, action): ToDo[] => {
  if (action.type === "Add") {
    const newToDos = [...state, action.payload];
    saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "Change") {
    const newToDos = state.map((todo) => {
      return todo.id === action.payload.id ? action.payload : todo;
    });
    saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "Delete") {
    const newToDos = state.filter((todo) => todo.id !== action.payload);
    saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "DeleteAll") {
    removeToDo();
    return [];
  } else if (action.type === "Reset") {
    return getSavedToDos();
  } else {
    throw new Error("Unknown action type");
  }
};

export interface UseToDoReturn {
  toDos: ToDo[];
  isInitialized: boolean;
  dispatch: (action: Action) => void;
}

export const useToDo = (): UseToDoReturn => {
  const [toDos, dispatch] = useReducer(reducer, []);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch({ type: "Reset" });
    setIsInitialized(true);
  }, []);

  return {
    toDos,
    isInitialized,
    dispatch,
  };
};
