import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { ChangeEvent, MouseEvent, Dispatch, FormEvent, useCallback, useState } from "react";
import styled from "styled-components";
import { Action } from "@/hooks/useToDo";

const Input = styled.input`
  height: 40px;
  width: 100%;
  padding-inline: 20px 60px;
  border-radius: 20px;
  border: 2px solid gray;
  font-size: 16px;

  &:focus {
    outline: 2px solid #0b76ef;
    border: 2px solid #0b76ef;
  }
`;

const Form = styled.form`
  display: flex;
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 0 20px 20px 0;
  outline: none;
  color: gray;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #0b76ef;
    border: 2px solid #0b76ef;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const generateId = (title: string) => {
  return `id-${title}-${Date.now()}`;
};

interface AddToDoFormProps {
  dispatch: Dispatch<Action>;
}

export const AddToDoForm = (props: AddToDoFormProps) => {
  const { dispatch } = props;
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
    <Form onSubmit={onSubmit} name="AddToDoForm">
      <Input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="What needs to be done?"
        name="AddToDoInput"
      />
      <Button type="reset" onClick={onReset}>
        <CloseIcon />
      </Button>
    </Form>
  );
};
