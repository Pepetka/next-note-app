"use client";

import { useCallback, MouseEvent } from "react";
import type { ToDo } from "@/shared/types/ToDo";
import { CloseIcon } from "@/shared/ui";
import styles from "./ToDoListItem.module.css";

interface ToDoListItemProps {
  todo: ToDo;
  height: number;
  translateY: number;
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ToDoListItem = (props: ToDoListItemProps) => {
  const { todo, onCheck, onDelete, height, translateY } = props;

  const onDeleteHandle = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onDelete(todo.id);
    },
    [onDelete, todo.id],
  );

  const onChangeHandle = useCallback(() => onCheck(todo.id), [onCheck, todo.id]);

  return (
    <div
      className={styles.toDoItem}
      data-testid={`ToDoListItem${todo.id}`}
      style={{ transform: `translateY(${translateY}px)`, height: `${height}px` }}
    >
      <label className={styles.label}>
        <input
          className={styles.checkbox}
          data-testid={`ToDoListItem${todo.id}__Checkbox`}
          type="checkbox"
          checked={todo.checked}
          onChange={onChangeHandle}
          name={todo.title}
        />
        <div className={styles.labelText}>{todo.title}</div>
        <button
          className={styles.delete}
          data-testid={`ToDoListItem${todo.id}__Delete`}
          type="button"
          onClick={onDeleteHandle}
        >
          <CloseIcon />
        </button>
      </label>
    </div>
  );
};
