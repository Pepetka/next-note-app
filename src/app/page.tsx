"use client";

import styled from "styled-components";
import { ToDoList } from "../components/ToDoList";
import { AddToDoForm } from "../components/AddToDoForm";
import { useToDo } from "@/hooks/useToDo";
import { Controls } from "../components/Controls";

const Wrapper = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  color: gray;
  margin-bottom: 20px;
`;

interface HomeProps {
  searchParams: { filter: "all" | "active" | "finished" | null };
}

const Home = (props: HomeProps) => {
  const { searchParams } = props;
  const { toDos, isInitialized, dispatch } = useToDo();

  return (
    <Main>
      <Wrapper>
        <Title>Todos</Title>
        <AddToDoForm dispatch={dispatch} />
        <Controls filter={searchParams.filter} />
        <ToDoList
          toDos={toDos}
          filter={searchParams.filter}
          isInitialized={isInitialized}
          dispatch={dispatch}
        />
      </Wrapper>
    </Main>
  );
};

export default Home;
