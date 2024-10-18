"use client";

import { useCallback, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Spinner } from "@/components/Spinner";
import { useSelector } from "@/shared/hooks/useSelector";
import { useDispatch } from "@/shared/hooks/useDispatch";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";
import styles from "./ToDoList.module.css";

interface ToDoListProps {
  filter: "all" | "active" | "finished" | null;
}

export const ToDoList = (props: ToDoListProps) => {
  const { filter = "all" } = props;
  const { toDos = [], isInitialized = false } = useSelector((store) => ({
    isInitialized: store.isInitialized,
    toDos: store.toDos,
  }));
  const dispatch = useDispatch();

  const filteredToDos = useMemo(
    () =>
      filter === "all"
        ? toDos
        : toDos.filter((toDo) => {
            switch (filter) {
              case "active":
                return !toDo.checked;
              case "finished":
                return toDo.checked;
              default:
                return true;
            }
          }),
    [filter, toDos],
  );

  const parentRef = useRef<HTMLUListElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredToDos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  const onCheck = useCallback(
    (todoId: string) => {
      const toDo = filteredToDos.find((todo) => todo.id === todoId);

      if (toDo) {
        dispatch({ type: "Change", payload: { ...toDo, checked: !toDo.checked } });
      }
    },
    [dispatch, filteredToDos],
  );

  const onDelete = useCallback(
    (todoId: string) => {
      dispatch({ type: "Delete", payload: todoId });
    },
    [dispatch],
  );

  if (!isInitialized) {
    return (
      <div className={styles.loaderContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <ul className={styles.toDoListWrapper} ref={parentRef}>
      <div className={styles.virtualContainer} style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const todo = filteredToDos[virtualItem.index];

          return (
            <ToDoListItem
              key={virtualItem.key}
              todo={todo}
              onCheck={onCheck}
              onDelete={onDelete}
              height={virtualItem.size}
              translateY={virtualItem.start}
            />
          );
        })}
      </div>
    </ul>
  );
};
