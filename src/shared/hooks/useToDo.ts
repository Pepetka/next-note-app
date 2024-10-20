import { Reducer, useEffect, useReducer, useState } from "react";
import type { ToDo } from "@/shared/types/ToDo";
import { ToDosLS } from "@/shared/lib";

export type Action =
  | {
      type: "Add" | "Change";
      payload: ToDo;
    }
  | {
      type: "ClearCompleted" | "Delete";
      payload: string;
    }
  | {
      type: "Reset" | "ClearAll";
    };

const reducer: Reducer<ToDo[], Action> = (state, action): ToDo[] => {
  if (action.type === "Add") {
    const newToDos = [...state, action.payload];
    ToDosLS.saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "Change") {
    const newToDos = state.map((todo) => {
      return todo.id === action.payload.id ? action.payload : todo;
    });
    ToDosLS.saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "Delete") {
    const newToDos = state.filter((todo) => todo.id !== action.payload);
    ToDosLS.saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "ClearAll") {
    ToDosLS.clearToDos();
    return [];
  } else if (action.type === "ClearCompleted") {
    const newToDos = state.filter((todo) => !todo.checked);
    ToDosLS.saveToDos(newToDos);
    return newToDos;
  } else if (action.type === "Reset") {
    return ToDosLS.getSavedToDos();
  } else {
    throw new Error("Unknown action type");
  }
};

export interface UseToDoReturn {
  toDos: ToDo[];
  isInitialized: boolean;
  dispatch: (action: Action) => void;
}

type UseToDoInitial = Partial<Omit<UseToDoReturn, "dispatch">>;

export const useToDo = (initialState: UseToDoInitial): UseToDoReturn => {
  const [toDos, dispatch] = useReducer(reducer, initialState.toDos ?? []);
  const [isInitialized, setIsInitialized] = useState(initialState.isInitialized ?? false);

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
