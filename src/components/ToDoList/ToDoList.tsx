import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import styled from "styled-components";
import { ToDo } from "@/types/ToDo";
import { Dispatch, useCallback, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Action } from "@/hooks/useToDo";
import { Spinner } from "../Spinner";

const ToDoListWrapper = styled.ul`
  padding-block: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden auto;
  flex-grow: 1;
`;

const ToDoItem = styled.li<{ $height: number; $translateY: number }>`
  position: absolute;
  top: 0;
  left: 0;
  list-style: none;
  width: 100%;
  transform: translateY(${(props) => props.$translateY}px);
  height: ${(props) => props.$height}px;
  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.7;
    transform: translateY(${(props) => props.$translateY}px) scale(1.02);
  }
`;

const Checkbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const Label = styled.label`
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  color: black;

  &:before {
    content: "";
    cursor: pointer;
    opacity: 1;
    display: block;
    border: 2px solid gray;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 10px;
    background-color: #fff;
  }

  &:has(input[type="checkbox"]:checked):before {
    background-color: #0b76ef;
    border-color: #0b76ef;
  }

  &:has(input[type="checkbox"]:focus-visible):before {
    border-color: white;
    outline: 2px solid #0b76ef;
  }
`;

const VirtualContainer = styled.div<{ $height: number }>`
  height: ${(props) => props.$height}px,
  width: 100%;
  position: relative;
`;

const LabelText = styled.span`
  flex-grow: 1;
  input[type="checkbox"]:checked + & {
    text-decoration: line-through;
    opacity: 0.6;
  }
`;

const Delete = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  justify-self: flex-end;
  border-radius: 50%;
  color: gray;
  transition: all 0.1s ease-in-out;

  &:focus-visible {
    outline: 2px solid #0b76ef;
  }

  &:hover {
    transform: scale(0.95);
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface ToDoListProps {
  toDos: ToDo[];
  isInitialized: boolean;
  dispatch: Dispatch<Action>;
  filter: "all" | "active" | "finished" | null;
}

export const ToDoList = (props: ToDoListProps) => {
  const { toDos, isInitialized, dispatch, filter = "all" } = props;

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
      <LoaderContainer>
        <Spinner />
      </LoaderContainer>
    );
  }

  return (
    <ToDoListWrapper ref={parentRef}>
      <VirtualContainer $height={rowVirtualizer.getTotalSize()}>
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const todo = filteredToDos[virtualItem.index];

          return (
            <ToDoItem
              key={virtualItem.key}
              $height={virtualItem.size}
              $translateY={virtualItem.start}
            >
              <Label>
                <Checkbox
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => onCheck(todo.id)}
                  name={todo.title}
                />
                <LabelText>{todo.title}</LabelText>
                <Delete
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(todo.id);
                  }}
                >
                  <CloseIcon />
                </Delete>
              </Label>
            </ToDoItem>
          );
        })}
      </VirtualContainer>
    </ToDoListWrapper>
  );
};
