import { ToDoList } from "@/components/ToDoList";
import { AddToDoForm } from "@/components/AddToDoForm";
import { Controls } from "@/components/Controls";
import styles from "./page.module.css";

interface HomeProps {
  searchParams: { filter: "all" | "active" | "finished" | null };
}

const HomePage = (props: HomeProps) => {
  const { searchParams } = props;

  return (
    <div className={styles.main} data-testid="HomePage">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Todos</h1>
        <AddToDoForm />
        <Controls filter={searchParams.filter} />
        <ToDoList filter={searchParams.filter} />
      </div>
    </div>
  );
};

export default HomePage;
