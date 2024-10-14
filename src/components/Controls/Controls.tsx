import styled from "styled-components";
import Link from "next/link";

const ControlsWrapper = styled.div`
  height: 60px;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button<{ $active?: boolean }>`
  padding-inline: 10px;
  height: 40px;
  width: 80px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => (props.$active ? "#0B76EF" : "#fff")};
  border: 2px solid ${(props) => (props.$active ? "#0B76EF" : "gray")};
  color: ${(props) => (props.$active ? "#fff" : "gray")};
  transition: all 0.1s ease-in-out;
  font-weight: bold;

  &:focus-visible {
    border: 2px solid #fff;
    outline: 2px solid #0b76ef;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const CONTROLS = ["All", "Active", "Finished"];

interface ControlsProps {
  filter: "all" | "active" | "finished" | null;
}

export const Controls = (props: ControlsProps) => {
  const { filter = "all" } = props;

  return (
    <ControlsWrapper>
      {CONTROLS.map((control) => (
        <Link key={control} href={{ query: { filter: control.toLowerCase() } }}>
          <Button $active={control.toLowerCase() === filter}>{control}</Button>
        </Link>
      ))}
    </ControlsWrapper>
  );
};
