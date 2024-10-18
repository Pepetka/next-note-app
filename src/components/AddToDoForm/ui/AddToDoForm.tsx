"use client";

import { ChangeEvent, MouseEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch } from "@/shared/hooks/useDispatch";
import { CloseIcon } from "@/shared/ui";
import styles from "./AddToDoForm.module.css";

const generateId = (title: string) => {
  return `id-${title}-${Date.now()}`;
};

export const AddToDoForm = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim()) return;
      dispatch({
        type: "Add",
        payload: {
          title: input,
          checked: false,
          id: generateId(input),
        },
      });
      setInput("");
    },
    [dispatch, input],
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onReset = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInput("");
  }, []);

  return (
    <form className={styles.form} onSubmit={onSubmit} name="AddToDoForm">
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={onChange}
        placeholder="What needs to be done?"
        name="AddToDoInput"
      />
      <button className={styles.button} type="reset" onClick={onReset}>
        <CloseIcon />
      </button>
    </form>
  );
};
