import type { ToDo } from "@/shared/types/ToDo";

export class ToDosLS {
  public static getSavedToDos(): ToDo[] {
    if (typeof window === "undefined") return [];
    const toDos = localStorage.getItem("toDos");
    return toDos ? JSON.parse(toDos) : [];
  }

  public static saveToDos(toDos: ToDo[]): ToDo[] {
    if (typeof window === "undefined") return [];
    localStorage.setItem("toDos", JSON.stringify(toDos));
    return toDos;
  }

  public static clearToDos(): ToDo[] {
    if (typeof window === "undefined") return [];
    localStorage.removeItem("toDos");
    return [];
  }
}
